import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createChannelThunk, allChannelsByServer } from "../../redux/channels";
import { useModal } from "../../context/Modal";
import "./CreateChannelModal.css";

function CreateChannelModal({ serverId, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();
  const user = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
  });

  if (!user) {
    return <p>Please log in to create a channel</p>;
  }

  const handleFormData = async (e) => {
    setErrors({});
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let validationErrors = {};
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

    const newChannelData = {
      name: formData.name,
    };

    const newChannel = await dispatch(
      createChannelThunk(serverId, newChannelData)
    );
    setFormData({ name: "" });
    setErrors({});
    closeModal();
    if (newChannel && newChannel.id) {
      navigate(`/server/${serverId}/channel/${newChannel.id}`);
    } else {
      await dispatch(allChannelsByServer(serverId));
    }
  };
  return (
    <div className="create-channel-modal">
      <h2>Create a Channel</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Channel Name</label>
          <input name="name" value={formData.name} onChange={handleFormData} />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <button type="submit">Create Channel</button>
        {errors.server && <p className="error">{errors.server}</p>}
      </form>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default CreateChannelModal;
