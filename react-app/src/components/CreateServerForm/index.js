import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { thunkCreateNewServer } from '../../store/servers';
import { useModal } from '../../context/Modal'

const CreateServerForm = () => {
    const dispatch = useDispatch();
    const [serverName, setServerName] = useState('');
    const [pfpURL, setPfpURL] = useState('');
    const [description, setDescription] = useState('');
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
        if (!response.ok) {
            const data = await response.json();
            console.log(data.errors)
            setErrors(data.errors)
        } else {
            closeModal();
        }

        // if no error, redirect to new server info page


    }

    return (
        <form>
            <h1>Create a new server</h1>
            {errors && <p>{errors.errors}</p>}

            <label htmlFor='server-name' className='formLabel'>Name</label>
            {errors.name && <p>{errors.name}</p>}
            <input
                placeholder='Server name'
                type='text'
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
            />

            <label htmlFor='server-pic' className='formLabel'>Server Picture</label>
            {errors.serverPic && <p>{errors.serverPic}</p>}
            <input
                placeholder='Server pic Example: https://funny-pic.png'
                value={pfpURL}
                onChange={(e) => setPfpURL(e.target.value)}
            />

            <label htmlFor='description'></label>
            {errors.description && <p>{errors.description}</p>}
            <input
                placeholder='Server description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <div>
                <label htmlFor='public'>Public</label>
                <input
                    name='is-public'
                    type='radio'
                    id='public'
                    value="public"
                    onChange={() => setSelectedOption('public')}
                    checked={selectedOption === 'public'}
                />

                <label htmlFor='private'>Private</label>
                <input
                    name='is-public'
                    type='radio'
                    id='private'
                    value="private"
                    onChange={() => setSelectedOption('private')}
                    checked={selectedOption === 'private'}
                />
            </div>

            <button type='submit' onClick={handleSubmit}>Submit</button>

        </form>
    )
}

export default CreateServerForm