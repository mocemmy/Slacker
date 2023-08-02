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

            <label for='server-name' className='formLabel'>Name</label>
            <input
                placeholder='Server name'
                type='text'
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
            />

            <label for='server-pic' className='formLabel'>Server Picture</label>
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
                {/* <button type='button' value={isPublic} onClick={() => setIsPublic(true)}>Public</button>
                <button type='button' value={isPublic} onClick={() => setIsPublic(false)}>Private</button> */}
                <label for='public'>Public</label>
                <input type='radio' id='public' value="public" />

                <label for='private'>pPrivate</label>
                <input type='radio' id='private' value="private" />
            </div>

            <button type='submit'>Submit</button>

        </form>
    )
}

export default CreateServerForm