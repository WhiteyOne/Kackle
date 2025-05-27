import { useDispatch } from 'react-redux';
import { deleteAServerThunk, getAllServersThunk } from '../../../../redux/servers';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../../../context/Modal';
import './DeleteServerModal.css';

const DeleteServerModal = ({ serverId, onClose }) => {      
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal();

    const handleDelete = async () => {
        await dispatch(deleteAServerThunk(serverId));
        closeModal();
        navigate('/servers');
        await dispatch(getAllServersThunk());

        
    };

    return (
        <div className="delete-server-modal">
            <h2>Are you sure you want to delete this server?</h2>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
}
export default DeleteServerModal;