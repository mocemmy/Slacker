import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkEditUser } from "../../store/session";
import "./EditUser.css";

function EditUser({ user }) {
  const dispatch = useDispatch();
  const [first_name, setFirstName] = useState(user ? user.first_name : "");
  const [last_name, setLastName] = useState(user ? user.last_name : "");
  const [bio, setBio] = useState(user?.bio ? user.bio : "");
  const [profile_pic, setProfilePic] = useState(user ? user.profile_pic : "");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const validationErrors = {};
    if (!first_name.length)
      validationErrors.first_name = "First name is required";
    if (first_name.length > 50)
      validationErrors.first_name =
        "First name must be shorter than 50 characters";
    if (last_name.length > 50)
      validationErrors.last_name =
        "Last name must be shorter than 50 characters";
    if (!last_name) validationErrors.last_name = "Last name is required";

    if (bio.length >= 255)
      validationErrors.bio = "Bio must be shorter than 255 characters";

    if (profile_pic.length >= 255)
      validationErrors.profile_pic = "URL must be shorter than 255 characters";
    if(!profile_pic.toLowerCase().endsWith(".jpg") &&
    !profile_pic.toLowerCase().endsWith(".png") &&
    !profile_pic.toLowerCase().endsWith(".jpeg")) validationErrors.profile_pic = "url must end with .jpg, .jpeg, or .png"
    
    setErrors(validationErrors);
  }, [first_name, last_name, bio, profile_pic, hasSubmitted]);

  if (user.id === 15 || user.id === 16) {
    window.alert("you can't edit the Demo User");
  }

  const onClick = () => {
    setHasSubmitted(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Object.keys(errors).length) {
      if (user.id === 15 || user.id === 16) {
        window.alert("You can't edit the Demo User");
      } else {
        const data = {
          first_name,
          last_name,
          bio,
          profile_pic,
        };
        const response = await dispatch(thunkEditUser(data, user.id));
        if (response.errors) {
          const validationErrors = {};
          validationErrors.serverErrors = response.errors;
          setErrors(validationErrors);
        } else {
          closeModal();
        }
      }
    }
  };

  return (
    <div>
      <form className="form-container" method="post" onSubmit={handleSubmit}>
        <h1 className="modal-title">Edit User Information</h1>
        {hasSubmitted && errors.first_name && (
          <p className="errors">{errors.first_name}</p>
        )}
        {errors.serverErrors && <p className="errors">{errors.serverErrors}</p>}
        <label htmlFor="first_name">First Name</label>
        <input
          name="first_name"
          value={first_name}
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="first name"
        />
        {hasSubmitted && errors.last_name && (
          <p className="errors">{errors.last_name}</p>
        )}
        <label htmlFor="last_name">Last Name</label>
        <input
          name="last_name"
          value={last_name}
          type="text"
          onChange={(e) => setLastName(e.target.value)}
          placeholder="last name"
        />
        {hasSubmitted && errors.bio && <p className="errors">{errors.bio}</p>}
        <label htmlFor="bio">Bio</label>
        <input
          name="bio"
          type="text"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="bio"
        />
        {hasSubmitted && errors.profile_pic && (
          <p className="errors">{errors.profile_pic}</p>
        )}
        <label htmlFor="profile_pic">Profile Picture</label>
        <input
          name="profile_pic"
          type="text"
          value={profile_pic}
          onChange={(e) => setProfilePic(e.target.value)}
          placeholder="profile_pic"
        />
        <button className="form-button" type="submit" onClick={onClick}>
          Update User Information
        </button>
      </form>
    </div>
  );
}

export default EditUser;
