import React from 'react'
import { useModal } from '../../context/Modal'

const ServerListModalListItem = ({
    modalComponent, // component to render inside the modal
    // itemText, // text of the menu item that opens the modal
    onItemClick, // optional: callback function that will be called once the menu item that opens the modal is clicked
    onModalClose // optional: callback function that will be called once the modal is closed
}) => {

    const { setModalContent, setOnModalClose } = useModal();

    const handleOnClick = () => {
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent);
        if (onItemClick) onItemClick();
    }

    return (
        <li key='new-Server' className="serverListItem" >
            <img
            title="Add a Workspace"
                onClick={handleOnClick}
                src="/plus.png"
                alt="new-server"
                className="serverListImg"
            >
            </img>
        </li>
    )
}

export default ServerListModalListItem
