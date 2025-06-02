import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateServerThunk } from "../../redux/servers";
import { useModal } from "../../context/Modal";


function UpdateServerModal() {
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const { closeModal } = useModal();
    const server = useSelector(state => state.server.singleServer); 
    const sessionUser = useSelector(state => state.session.user);
    const isOwner = sessionUser?.id === server?.owner_id;
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: server?.name || '',
    });

    useEffect(() => {
        if (server) {
            setFormData({ name: server.name });
        }
    }, [server]);

    
    if (server && !isOwner) {
  return (
      <div className="unauthorized-message">
          <p>You are not authorized to update this server</p>
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
            validationErrors.name = 'Server name is required';
        }
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const updatedServerData = {
            id: server.id,
            name: formData.name,
        };

        const updatedServer = await dispatch(updateServerThunk(updatedServerData));

        if (updatedServer && updatedServer.errors) {
            setErrors(updatedServer.errors);
        } 

        closeModal()
    };

    return (
        <div className="create-form" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit} className="create-server-form">
                <div className="server-form">
                    <p>Update Server</p>
                    <input
                        type="text"
                        name="name"
                        placeholder="Server Name"
                        value={formData.name}
                        onChange={handleFormData}
                    />
                    {errors.name && <p className="errors">{errors.name}</p>}
                </div>
                <button type="submit" disabled={Object.keys(errors).length > 0}>
                    Update Server
                </button>
                 <button onClick={closeModal}>Cancel</button>
            </form>
        </div>
    );
}

export default UpdateServerModal;
