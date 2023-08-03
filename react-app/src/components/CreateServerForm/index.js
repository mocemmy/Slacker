import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { thunkCreateNewServer, thunkGetAllServers } from '../../store/servers';
import { useModal } from '../../context/Modal'

const CreateServerForm = () => {
    const dispatch = useDispatch();
    const [serverName, setServerName] = useState(null);
    const [pfpURL, setPfpURL] = useState(null);
    const [description, setDescription] = useState(null);
    const [selectedOption, setSelectedOption] = useState("public");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // validation

        // end validation
        const server = {
            name: serverName,
            isPublic: selectedOption === "public",
            profilePic: pfpURL,
            description: description,
        };

        const response = await dispatch(thunkCreateNewServer(server));
        if (response.errors) {
            console.log(response.errors)
            setErrors(response.errors)
        } else {
            await dispatch(thunkGetAllServers(server))
            closeModal();
        }

        // if no error, redirect to new server info page


    }

    return (
        <form>
            <h1>Create a new server</h1>
            <h2>Name</h2>
            {errors.name && <p className='new-server-form-error'> Name Error: {errors.name}</p>}
            <input
                id='new-server-form-name'
                placeholder='Server name'
                type='text'
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
            />

            <h2>Picture URL</h2>
            {errors.serverPic && <p className='new-server-form-error'>Picture URL Error: {errors.serverPic}</p>}
            <input
                placeholder='Server pic Example: https://funny-pic.png'
                value={pfpURL}
                onChange={(e) => setPfpURL(e.target.value)}
            />

            <h2>Description</h2>
            {errors.description && <p className='new-server-form-error'>Description Error: {errors.description}</p>}
            <input
                placeholder='Server description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <div>
                <h2>Privacy</h2>
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
                {/* <div>
                    <input
                        name='is-public'
                        type='radio'
                        id='private'
                        value="private"
                        onChange={() => setSelectedOption('private')}
                        checked={selectedOption === 'private'}
                    />
                    <label htmlFor='private'>Private</label>
                </div> */}
            </div>

            <button type='submit' onClick={handleSubmit}>Submit</button>

        </form>
    )
}

export default CreateServerForm