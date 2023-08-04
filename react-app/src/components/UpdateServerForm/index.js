import React from 'react';
import ServerForm from '../ServerForm';

const UpdateServerForm = ({ currentServer }) => {

  return (<>
    <h1>Update Workspace</h1>
    <ServerForm server={currentServer} formType="update" />
  </>)
}

export default UpdateServerForm