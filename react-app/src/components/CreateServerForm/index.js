import React from 'react';
import ServerForm from '../ServerForm';

const CreateServerForm = () => {
    const server = {
        name: '',
        profilePic: '',
        description: '',
        isPublic: true,
    }

    return (<>
        <h1>Create a New Workspace</h1>
        <ServerForm server={server} formType="create" />
    </>
    )
}

export default CreateServerForm