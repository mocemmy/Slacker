import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from '../../context/Modal'
import { thunkEditUser } from "../../store/session";


function EditUser ({user}) {
    const dispatch = useDispatch();
    const [first_name, setFirstName] = useState(user ? user.first_name : "")
    const [last_name, setLastName] = useState(user ? user.last_name : "")
    const [bio, setBio] = useState(user ? user.bio : "")
    const [profile_pic, setProfilePic] = useState(user ? user.profile_pic : "")
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};
        if (!first_name) validationErrors.first_name = "First name is required"
        if (!last_name) validationErrors.last_name = "Last name is required"
        setErrors({validationErrors});


        const data = {
            first_name,
            last_name,
            bio,
            profile_pic,
        }
        const response = await dispatch(thunkEditUser(data, user.id))
        if(response.errors){
            const validationErrors = {}
            validationErrors.serverErrors = response.errors;
            setErrors(validationErrors)
        } else {
            closeModal()
        }
    }

    return (
        <div className='user-form-container'>
            <form method="post" onSubmit={handleSubmit}>
                <h1>Edit User Information</h1>
                {errors.name && <p className='errors'>{errors.name}</p>}
                {errors.serverErrors && <p className='errors'>{errors.serverErrors}</p>}
                <label htmlFor='first_name'>First Name</label>
                <input 
                    name='first_name'
                    value={first_name}
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder='first name' 
                />
                <label htmlFor='last_name'>Last Name</label>
                <input 
                    name='last_name'
                    value={last_name}
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder='last name' 
                />
                <label htmlFor='bio'>Bio</label>
                <input
                    name='bio'
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder='bio'
                />
                <label htmlFor='profile_pic'>Profile Picture</label>
                <input
                    name='profile_pic'
                    type="text"
                    value={profile_pic}
                    onChange={(e) => setProfilePic(e.target.value)}
                    placeholder='profile_pic'
                />
            <button type="submit" disabled={Object.keys(errors).length}>Update User Information</button>
            </form>
        </div>
    )

}

export default EditUser;