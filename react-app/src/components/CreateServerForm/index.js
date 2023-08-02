import React, { useState } from 'react'

const CreateServerForm = () => {
    // const [serverName, setServerName] = useState("")

    return (
        <form>
            <h1>Create a new server</h1>

            <label for='server-name'>Name</label>
            <input
                placeholder='Server name'
                type='text'
            // value={serverName}
            // onChange={(e) => setServerName(e.target.value)}
            />
        </form>
    )
}

export default CreateServerForm