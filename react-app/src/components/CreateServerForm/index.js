import React from 'react';
import ServerForm from '../ServerForm';

const CreateServerForm = () => {
    const server = {
        name: '',
        profilePic: '',
        description: '',
        isPublic: true,
    }

    return (
    <>
        <ServerForm server={server} formType="create" />
    </>
    )
}

export default CreateServerForm