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
    if (formType === 'create') {
        title = "Create a Workspace"
    } else {
        title = "Update Workspace"
    }

    const validateData = () => {
        const errorObj = {};

        if (!serverName.length) errorObj.name = 'This field is required.'
        if (serverName.length > 30) errorObj.name = 'Must be shorter than 30 characters.'

        if (pfpURL) {
            const splitImg = pfpURL.split('.')
            if (!(splitImg[splitImg.length - 1] === 'jpg' || splitImg[splitImg.length - 1] === 'png' || splitImg[splitImg.length - 1] === 'jpeg')) {
                errorObj.serverPic = 'Must end in .png, .jpg or .jpeg.';
            }
        }

        if (description.length > 255) errorObj.description = 'Must be shorter than 255 characters.'

        if (Object.keys(errorObj).length > 0) return errorObj
        else return false
    }

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
            const newErrors = validateData();

            if (newErrors) return setErrors(newErrors)

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
            const newErrors = validateData();

            if (newErrors) return setErrors(newErrors)

            const response = await dispatch(thunkUpdateServerById(newServer, server.id));
            if (response.errors) {
                console.log(response.errors)
                setErrors(response.errors)
            } else {
                // await dispatch(thunkGetAllServers())
                closeModal();
            }
            return
        }
    }

    return (
        <div id='server-form-container'>
            <form>
                <h1 className="modal-title" id='serverFormTitle'>{title}</h1>
                <label htmlFor='name' className='form-label'>Name{errors.name && <span className='errors'>: {errors.name}</span>}</label>
                {/* {errors.name && <p className='new-server-form-error'> Name Error: {errors.name}</p>} */}
                <input
                    className='server-form-input'
                    name='name'
                    id='new-server-form-name'
                    placeholder='Workspace name'
                    type='text'
                    value={serverName}
                    onChange={(e) => setServerName(e.target.value)}
                />

                <label htmlFor='profile_pic' className='form-label'>Picture URL{errors.serverPic && <span className='errors'>: {errors.serverPic}</span>}</label>
                {/* {errors.serverPic && <p className='new-server-form-error'>Picture URL Error: {errors.serverPic}</p>} */}
                <input
                    className='server-form-input'
                    name='profile_pic'
                    placeholder='Example: https://funny-pic.png'
                    value={pfpURL}
                    onChange={(e) => setPfpURL(e.target.value)}
                />

                <label htmlFor='description' className='server-form-label'>Description{errors.description && <span className='errors'>: {errors.description}</span>}</label>
                {/* {errors.description && <p className='new-server-form-error'>Description Error: {errors.description}</p>} */}
                <textarea
                    contentEditable
                    id='serverFormDescription'
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
        </div>
    )
}

export default ServerForm