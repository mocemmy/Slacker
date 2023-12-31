import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/app" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data) {
            setErrors(data);
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
            <h1 className="form-header">Sign in to Slacker</h1>
            <p className="sub-heading">
                We suggest using the <span>email address you use at work</span>
            </p>
            <form onSubmit={handleSubmit}>
                <ul className="errors">
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label for="email" className='formLabel'>Email</label>
                <input
                    className="form-input"
                    placeholder="name@work-email.com"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label for="password" className='formLabel'>Password</label>
                <input
                    className="form-input"
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="submit-button">
                    Log In
                </button>
            </form>
        </div>
    );
}

export default LoginFormPage;
