import { useDispatch } from 'react-redux';
import { deleteChannelThunk, allChannelsByServer } from '../../redux/channels';
import { useNavigate } from 'react-router-dom';
import './DeleteChannelModal.css';

const DeleteChannelModal = ({ channelId, onClose }) => {      
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = async () => {
        await dispatch(deleteChannelThunk(channelId));
        onClose();
        navigate('/channels');
        await dispatch(allChannelsByServer());

        
    };

    return (
        <div className="delete-server-modal">
            <h2>Are you sure you want to delete this channel?</h2>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
}
export default DeleteChannelModal;