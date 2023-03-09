import React, { useState } from "react";
import { login } from "../../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../context/Modal";

import "./LoginForm.css";

function LoginFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data) {
            setErrors(data);
        } else {
            closeModal();
        }
    };

    return (
        <div className="login_modal font-serif ">
            <h1 className="login-sign">Log In</h1>
            <form onSubmit={handleSubmit}>
                <ul className="errors">
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label className="input-label">
                    Email
                    <input className="input"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label className="input-label">
                    Password
                    <input className="input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button className='submit  bg-rose-500' type="submit">Log In</button>
            </form>
        </div>
    );
}

export default LoginFormModal;
