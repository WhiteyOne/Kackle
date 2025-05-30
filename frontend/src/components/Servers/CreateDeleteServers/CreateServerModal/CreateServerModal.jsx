import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { createAServerThunk } from "../../../../redux/servers";
import { useModal } from "../../../../context/Modal";
import "./CreateServerModal.css"


function CreateServerModal() {
    // hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal()
    // redux state
    const user = useSelector(state => state.session.user)

    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: '',
    })

    if (!user){
        return <p>Please log in to create a server</p>
    }

    const handleFormData = async (e) => {
        setErrors({});
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

    }
    const validateForm = () => {
        let validationErrors = {};
        if (!formData.name){
            validationErrors.name = 'Server name is required'
        }
        setErrors(validationErrors)
        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()){
            return;
        }

        const newServerData = {
            name: formData.name,
        };

        const newServer = await dispatch(createAServerThunk(newServerData))

        if (newServer && newServer.errors) {
            setErrors(newServer.errors)
        } else if (newServer && newServer.id) {
            setFormData({name: ""});
            setErrors({});
            closeModal()
            navigate(`/servers/${newServer.id}`)
        }
    }

    return (

            <div className="create-form" onClick={(e) => e.stopPropagation()}>
              
                <form onSubmit={handleSubmit} className="create-server-form">
                   <div className="server-form">
                    <p>Create a New Server</p>
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
                    Create Server
                    </button>
                </form>
            </div>
    )
}

export default CreateServerModal;
