import { useDispatch } from 'react-redux';
// import { deleteAServerThunk, getAllServersThunk } from '../../../../redux/servers';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../../../context/Modal';
import './DeleteServerModal.css';
import { deleteAServerThunk, getAllServersThunk } from '../../../../redux/servers';

const DeleteServerModal = ({ serverId, onClose }) => {      
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal();

    const handleDelete = async () => {
        try {
            dispatch(deleteAServerThunk(serverId));
            closeModal();
            navigate('/servers');
            console.log('14 handle Delete for DeleteServerModal', id)
            
        } catch (error) {
            
        }
        // dispatch(getAllServersThunk());
        // navigate('/servers');

        
    };

    return (
        <div className="delete-server-modal">
            <h2>Are you sure you want to delete this server?</h2>
            <button onClick={(e)=>{handleDelete(e,serverId)}}>Delete</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
}
export default DeleteServerModal;