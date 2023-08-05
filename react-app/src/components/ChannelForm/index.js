import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal'
import { thunkEditChannel, thunkCreateChannel } from '../../store/channels';
import './ChannelForm.css'


function ChannelForm({ channel, type, server, setCurrChannel }) {
    const dispatch = useDispatch();
    const [name, setName] = useState(channel ? channel.name : "")
    const [description, setDescription] = useState(channel ? channel.description : "")
    const [errors, setErrors] = useState({});
    const currentUser = useSelector(state => state.session.user);
    const { closeModal } = useModal();

    const validateData = () => {
        const errorObj = {};

        if (name.length === 0) errorObj.name = "Field is required."
        if (name.length > 50) errorObj.name = 'Must be less than 50 characters.'

        if (description.length > 255) errorObj.description = 'Must be less than 255 characters.'

        if (Object.keys(errorObj).length > 0) return errorObj
        else return false
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateData();

        if (newErrors) return setErrors(newErrors)

        const data = {
            created_by: currentUser.id,
            server_id: server.id,
            description,
            name
        }
        let response;
        if (type == "CREATE") {
           response = await dispatch(thunkCreateChannel(server.id, data));
           if (response.id){
               setCurrChannel(response);
           }
        } else {
            response = await dispatch(thunkEditChannel(channel.id, server.id, data));
        }
        if (response.errors) {
            const serverErrors = {}
            serverErrors.serverErrors = response.errors
            setErrors(serverErrors)
        } else {
            closeModal();
        }
    }

    let title;
    let buttonText;
    if (type === 'CREATE') {
        title = "Create a New Channel"
        buttonText = "Create Channel"
    } else {
        title = "Edit Your Channel"
        buttonText = "Save Changes"
    }

    return (
        <div>
            <form className='form-container' method="post" onSubmit={handleSubmit}>
                <h1 className='modal-title' id='channelFormTitle'>{title}</h1>
                {errors.serverErrors && <p className='errors'>{errors.serverErrors}</p>}
                <label htmlFor='name'>Name{errors.name && <span className='errors'>: {errors.name}</span>}</label>
                <input
                    name='name'
                    value={name}
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    placeholder='channel name'
                />
                <label htmlFor='description'>Description{errors.description && <span className='errors'>: {errors.description}</span>}</label>
                <input
                    name='description'
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='description'
                />
                <button className='form-button' type="submit">{buttonText}</button>
            </form>
        </div>
    )

}

export default ChannelForm;