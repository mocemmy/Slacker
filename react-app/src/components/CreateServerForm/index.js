import React, { useState, useEffect } from 'react'

const CreateServerForm = () => {
    const [serverName, setServerName] = useState('');
    const [pfpURL, setPfpURL] = useState('');
    const [description, setDescription] = useState('');
    const [selectedOption, setSelectedOption] = useState("public");

    const handleSubmit = (e) => {
        e.preventDefault()


    }

    return (
        <form>
            <h1>Create a new server</h1>

            <label htmlFor='server-name' className='formLabel'>Name</label>
            <input
                placeholder='Server name'
                type='text'
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
            />

            <label htmlFor='server-pic' className='formLabel'>Server Picture</label>
            <input
                placeholder='Server pic Example: https://funny-pic.png'
                value={pfpURL}
                onChange={(e) => setPfpURL(e.target.value)}
            />

            <label htmlFor='description'></label>
            <input
                placeholder='Server description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <div>
                {/* <button type='button' value={isPublic} onClick={() => setIsPublic(true)}>Public</button>
                <button type='button' value={isPublic} onClick={() => setIsPublic(false)}>Private</button> */}
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