import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { thunkCreateNewServer, thunkGetAllServers, thunkUpdateServerById } from '../../store/servers';
import { useModal } from '../../context/Modal'
import './ServerForm.css'

const ServerForm = ({ server, formType }) => {
    const dispatch = useDispatch();
    const [serverName, setServerName] = useState(server.name);
    const [pfpURL, setPfpURL] = useState(server.profile_pic);
    const [description, setDescription] = useState(server.description);
    const [selectedOption, setSelectedOption] = useState(server.isPublic ? "public" : "private");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    let title;
    if (formType === 'create'){
        title = "Create a Workspace"
    } else {
        title = "Update Workspace"
    }

    // const dispatch = useDispatch();
    // const [serverName, setServerName] = useState(null);
    // const [pfpURL, setPfpURL] = useState(null);
    // const [description, setDescription] = useState(null);
    // const [selectedOption, setSelectedOption] = useState("public");
    // const [errors, setErrors] = useState({});
    // const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // validation

        // end validation
        const newServer = {
            name: serverName,
            isPublic: selectedOption === "public",
            profilePic: pfpURL,
            description: description,
        };

        if (formType === "create") {
            const response = await dispatch(thunkCreateNewServer(newServer));
            if (response.errors) {
                console.log(response.errors)
                setErrors(response.errors)
            } else {
                await dispatch(thunkGetAllServers())
                closeModal();
            }
            return
        }
        if (formType === "update") {
            const response = await dispatch(thunkUpdateServerById(newServer, server.id));
            if (response.errors) {
                console.log(response.errors)
                setErrors(response.errors)
            } else {
                await dispatch(thunkGetAllServers())
                closeModal();
            }
            return
        }
    }

    return (
        <form className='form-container'>
            <h1 className="modal-title">{title}</h1>
            <label htmlFor='name' className='form-label'>Name</label>
            {errors.name && <p className='new-server-form-error'> Name Error: {errors.name}</p>}
            <input
                name='name'
                id='new-server-form-name'
                placeholder='Workspace name'
                type='text'
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
            />

            <label htmlFor='profile_pic' className='form-label'>Picture URL</label>
            {errors.serverPic && <p className='new-server-form-error'>Picture URL Error: {errors.serverPic}</p>}
            <input
                name='profile_pic'
                placeholder='Workspace pic Example: https://funny-pic.png'
                value={pfpURL}
                onChange={(e) => setPfpURL(e.target.value)}
            />

            <label htmlFor='description' className='form-label'>Description</label>
            {errors.description && <p className='new-server-form-error'>Description Error: {errors.description}</p>}
            <input
                name='description'
                placeholder='Workspace description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            {/* <div>
        <label>Privacy</label>
        <div>
          <input
            name='is-public'
            type='radio'
            id='public'
            value="public"
            onChange={() => setSelectedOption('public')}
            checked={selectedOption === 'public'}
          />
          <label htmlFor='public'>Public</label>
        </div>
        {<div>
                    <input
                        name='is-public'
                        type='radio'
                        id='private'
                        value="private"
                        onChange={() => setSelectedOption('private')}
                        checked={selectedOption === 'private'}
                    />
                    <label htmlFor='private'>Private</label>
                </div>}
      </div> */}

            <button className="form-button" type='submit' onClick={handleSubmit}>Submit</button>

        </form>
    )
}

export default ServerForm