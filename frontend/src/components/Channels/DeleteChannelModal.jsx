import { useDispatch } from 'react-redux';
import { deleteChannelThunk, allChannelsByServer } from '../../redux/channels';
import { getOneServerThunk } from '../../redux/servers';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/Modal'; 
import './DeleteChannelModal.css';

const DeleteChannelModal = ({ serverId, channelId, onClose }) => {      
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal();
    
    const handleDelete = async () => {
        try{
        await dispatch(deleteChannelThunk(serverId, channelId));
        closeModal();
        navigate(`/servers/${serverId}`);
        await dispatch(allChannelsByServer());
        await dispatch(getOneServerThunk(serverId))
        } catch (error) {
            console.log("Failed to delete channel:", error);
        }
    };

    return (
        <div className="delete-server-modal">
            <h2>Are you sure you want to delete this channel?</h2>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={closeModal}>Cancel</button>
        </div>
    );
}
export default DeleteChannelModal;