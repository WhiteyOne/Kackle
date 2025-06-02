import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { deleteAServerThunk } from '../../redux/servers';

const DeleteServerModal = ({ serverId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal();
    const server = useSelector(state => state.server.singleServer);
    const sessionUser = useSelector(state => state.session.user);
    const isOwner = sessionUser?.id === server?.owner_id;

    if (server && !isOwner) {
        return (
            <div className="unauthorized-message">
                <p>You are not authorized to delete this server.</p>
                <button onClick={closeModal}>Close</button>
            </div>
        );
    }
    const handleDelete = async () => {
             dispatch(deleteAServerThunk(serverId));
            closeModal();
            navigate('/servers');
                        
    };

    return (
        <div className="delete-server-modal">
            <h2>Are you sure you want to delete this server?</h2>
            <button onClick={(e) => { handleDelete(e, serverId) }}>Delete</button>
            <button onClick={closeModal}>Cancel</button>            
        </div>
    );
}
export default DeleteServerModal;