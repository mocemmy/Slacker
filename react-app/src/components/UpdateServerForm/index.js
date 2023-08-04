import React from 'react';
import ServerForm from '../ServerForm';

const UpdateServerForm = ({ currentServer }) => {

  return (<>
    <ServerForm server={currentServer} formType="update" />
  </>)
}

export default UpdateServerForm