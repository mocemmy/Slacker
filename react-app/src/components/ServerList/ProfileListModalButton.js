import React from 'react'
import { useModal } from '../../context/Modal'

const ProfileListModalButton = ({
  modalComponent, // component to render inside the modal
  buttonText, // text of the menu item that opens the modal
  onButtonClick, // optional: callback function that will be called once the menu item that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) => {

  const { setModalContent, setOnModalClose } = useModal();

  const handleOnClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  }

  return (
    <button onClick={handleOnClick}>{buttonText}</button>
  )

}

export default ProfileListModalButton