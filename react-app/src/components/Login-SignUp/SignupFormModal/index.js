import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../context/Modal";
import { signUp } from "../../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [is_brand, setIs_Brand] = useState(false);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [brandName, setBrandName] = useState("")
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
  
        if (password === confirmPassword) {
            const data = await dispatch(
                signUp(username, email, password, firstName, lastName, brandName, is_brand)
         
            );
            if (data) {
                setErrors(data);
            } else {
                closeModal();
            }
        } else {
            setErrors([
                "Confirm Password field must be the same as the Password field",
            ]);
        }
      
    };

    return (
        <>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <ul className="errors">
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label>
                    Email
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Username
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                {!is_brand && (
                    <>
                <label>
                    First Name
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      
                    />
                </label>
                <label>
                    Last Name
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    
                    />
                </label>
                </>
                )}

                <div >
                <label className="checkbox-wrapper-2">
                    Are you a Brand?
                    <input
                        type="checkbox"
                        className="sc-gJwTLC ikxBAC"
                        value={is_brand}
                        onChange={() => setIs_Brand(!is_brand)}
                    />
                </label>
                </div>

                    {is_brand &&(
                <label >
                Brand Name
                <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                
                />
            </label>
                )
                    }
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Confirm Password
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Sign Up</button>
            </form>
        </>
    );
}

export default SignupFormModal;
