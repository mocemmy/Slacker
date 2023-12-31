import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const validateEmail = (email) => {
        return email.match(
            // eslint-disable-next-line
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    useEffect(() => {
        const validationErrors = {};

        if (!first_name.length) validationErrors.first_name = "First name is required";

        if (first_name.length > 50) validationErrors.first_name = "First name must be shorter than 50 characters";

        if (last_name.length > 50) validationErrors.last_name = "Last name must be shorter than 50 characters";

        if (!last_name) validationErrors.last_name = "Last name is required";

        if (!username) validationErrors.username = "Username is required";

        if (!email) validationErrors.email = "Email is required";

        if (!validateEmail(email)) validationErrors.email = 'Email is not valid'

        if (!password) validationErrors.password = "Password is required";

        if (password.length < 6) validationErrors.password = 'Password must be 6 or more characters'

        if (password !== confirmPassword)
            validationErrors.confirmPassword = "Passwords must match";

        setErrors(validationErrors);
    }, [first_name, last_name, username, password, confirmPassword, email, hasSubmitted]);

    const onClick = () => {
        setHasSubmitted(true);
    };
    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(errors).length === 0) {
            const data = await dispatch(
                signUp(username, first_name, last_name, email, password)
            );
            if (data) {
                setErrors({ serverErrors: data });
            }
        }
    };

    return (
        <div className="login-page-container">
            <div className="slacker-logo">
                <Link className="login-home-link" to="/">
                    <img src="/favicon.png" alt="slacker logo" id="slacker-logo" />
                    slacker
                </Link>
            </div>
            <h1 className="form-header">Welcome to Slacker</h1>
            <p className="sub-heading">
                We suggest using the <span>email address you use at work</span>
            </p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email" className="formLabel">
                    First Name
                </label>
                {hasSubmitted && errors.first_name && (
                    <p className="errors">{errors.first_name}</p>
                )}
                {hasSubmitted && errors.serverErrors && (
                    <p className="errors">{errors.serverErrors}</p>
                )}
                <input
                    className="form-input"
                    placeholder="first name"
                    type="text"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <label htmlFor="email" className="formLabel">
                    Last Name
                </label>
                {hasSubmitted && errors.last_name && (
                    <p className="errors">{errors.last_name}</p>
                )}
                <input
                    className="form-input"
                    placeholder="last name"
                    type="text"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                {hasSubmitted && errors.username && (
                    <p className="errors">{errors.username}</p>
                )}
                <label htmlFor="username" className="formLabel">
                    Username
                </label>
                <input
                    className="form-input"
                    placeholder="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label htmlFor="email" className="formLabel">
                    Email
                </label>
                {hasSubmitted && errors.email && (
                    <p className="errors">{errors.email}</p>
                )}
                <input
                    className="form-input"
                    placeholder="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {hasSubmitted && errors.password && (
                    <p className="errors">{errors.password}</p>
                )}
                <label htmlFor="password" className="formLabel">
                    Password
                </label>
                <input
                    className="form-input"
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {hasSubmitted && errors.confirmPassword && (
                    <p className="errors">{errors.confirmPassword}</p>
                )}
                <label htmlFor="confirm-password" className="formLabel">
                    Confirm Password
                </label>
                <input
                    className="form-input"
                    placeholder="confirm password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button onClick={onClick} type="submit" className="submit-button">
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default SignupFormPage;
