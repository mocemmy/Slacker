import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import { useModal } from '../../context/Modal'
import { logout } from '../../store/session'

const ConfirmLogout = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleClick = (e) => {
        if (e.target.value === 'yes') {
            dispatch(logout())
            history.push('/')
            closeModal()
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