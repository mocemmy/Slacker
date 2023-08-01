import React from 'react'
import { logout } from '../../store/session'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'

const ConfirmLogout = () => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleClick = (e) => {
        if (e.target.value === 'yes') {
            dispatch(logout())
        } else {
            closeModal()
        }
    }

    return (
        <>
            <h1>Are you sure you want to logout?</h1>
            <button value='yes' onClick={handleClick}>Yes</button>
            <button value='no' onClick={handleClick}>No</button>
        </>
    )
}

export default ConfirmLogout