import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { allChannelsByServer, updateChannelThunk } from "../../redux/channels";
import { getOneServerThunk } from "../../redux/servers";
import { useState, useEffect } from "react";


const UpdateChannelModal = ({ channel, serverId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const user = useSelector((state) => state.session.user);
  const server = useSelector((state) => state.server.singleServer);
  const currentChannel = useSelector(
    (state) => state.channels.allChannels[channel.id]
  );
  const isOwner = user?.id === server?.owner_id;
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: currentChannel.name,
  });

  useEffect(() => {
    if (!server) {
      dispatch(getOneServerThunk(serverId));
    }
  }, [dispatch, serverId, server]);

  useEffect(() => {
    if (currentChannel) {
      setFormData({ name: currentChannel.name });
      setErrors({});
    }
  }, [currentChannel]);

  if (!isOwner) {
    return (
      <div className="error-message">
        <p>You are not authorized to update this channel</p>
        <button onClick={closeModal}>Close</button>
      </div>
    );
  }

  const handleFormData = (e) => {
    setErrors({});
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!formData.name) {
      validationErrors.name = "Channel name is required";
    }
    if (formData.name && formData.name.length > 30) {
      validationErrors.name = "Channel name must be less than 30 characters";
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const updatedChannelData = {
      name: formData.name,
    };

    const updatedChannel = await dispatch(
      updateChannelThunk(serverId, currentChannel.id, updatedChannelData)
    );
    setFormData({ name: "" });

    if (updatedChannel && updatedChannel.errors) {
      setErrors(updatedChannel.errors);
    } else if (updatedChannel && updatedChannel.id) {
      await dispatch(getOneServerThunk(serverId));
      await dispatch(allChannelsByServer(serverId));   
      setErrors({});
      closeModal();
    }
  };

  return (
    <div className="update-channel-modal">
      <h2>Update Channel</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Channel Name:
          <input
            type="text"
            placeholder="Enter channel name"
            name="name"
            value={formData.name}
            onChange={handleFormData}
          />
        </label>
        {errors.name && <p className="error">{errors.name}</p>}
        <button type="submit">Update</button>
        <button type="button" onClick={closeModal}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateChannelModal;
