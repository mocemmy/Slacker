import React, { useState, useEffect } from 'react'

const CreateServerForm = () => {
    const [serverName, setServerName] = useState('')
    const [pfpURL, setPfpURL] = useState('')
    const [description, setDescription] = useState('')
    const [isPublic, setIsPublic] = useState(true)

    useEffect(() => {
        console.log(isPublic)
    }, [isPublic])

    return (
        <form>
            <h1>Create a new server</h1>

            <label for='server-name'>Name</label>
            <input
                placeholder='Server name'
                type='text'
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
            />

            <label for='server-pic'>Server Picture</label>
            <input
                placeholder='Server pic Example: https://funny-pic.png'
                value={pfpURL}
                onChange={(e) => setPfpURL(e.target.value)}
            />

            <label for='description'></label>
            <input
                placeholder='Server description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <div>
                <button type='button' value={isPublic} onClick={() => setIsPublic(true)}>Public</button>
                <button type='button' value={isPublic} onClick={() => setIsPublic(false)}>Private</button>
            </div>

            <button type='submit'>Submit</button>

        </form>
    )
}

export default CreateServerForm