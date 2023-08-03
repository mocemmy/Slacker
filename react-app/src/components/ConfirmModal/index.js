import React from 'react'
import { useModal } from '../../context/Modal'

const ConfirmModal = ({ modalTitle, yesHandler }) => {
    const { closeModal } = useModal();

    if (!modalTitle) return null

    const handleClick = async () => {
        await yesHandler();
        closeModal();
    }

    return (
        <>
            <h1>{modalTitle}</h1>

            <button onClick={handleClick}>Yes</button>
            <button onClick={closeModal}>No</button>
        </>
    )
}

export default ConfirmModal