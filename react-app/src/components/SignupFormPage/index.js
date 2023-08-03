import React, { useState } from "react";
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

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            const data = await dispatch(signUp(username, first_name, last_name, email, password));
            if (data) {
                setErrors(data);
            }
        } else {
            setErrors([
                "Confirm Password field must be the same as the Password field",
            ]);
        }
    };

    return (
        <div className="login-page-container">
            <div className="slacker-logo">
                <Link className="login-home-link" to="/"><img src="/favicon.png" alt="slacker logo" id="slacker-logo" />
                    slacker
                </Link>
            </div>
            <h1 className="form-header">Welcome to Slacker</h1>
            <p className="sub-heading">
                We suggest using the <span>email address you use at work</span>
            </p>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label htmlFor="email" className='formLabel'>First Name</label>
                <input
                    className="form-input"
                    placeholder="first name"
                    type="text"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <label htmlFor="email" className='formLabel'>Last Name</label>
                <input
                    className="form-input"
                    placeholder="last name"
                    type="text"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <label htmlFor="username" className='formLabel'>Username</label>
                <input
                    className="form-input"
                    placeholder="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label htmlFor="email" className='formLabel'>Email</label>
                <input
                    className="form-input"
                    placeholder="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="password" className='formLabel'>Password</label>
                <input
                    className="form-input"
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label htmlFor="confirm-password" className='formLabel'>Confirm Password</label>
                <input
                    className="form-input"
                    placeholder="confirm password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit" className="submit-button">
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default SignupFormPage;
