import React from 'react';
import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

const Register = () => {
    const [accepted, setAccepted] = useState(false);
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const passRef = useRef(null);
    let history = useHistory();
    const handleChange = (e) => {
        const isAccepted = e.target.checked;

        if (isAccepted) {
            setAccepted(true);
        } else {
            setAccepted(false);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const allDetailsFilled = firstNameRef.current.value.trim() && lastNameRef.current.value.trim() && emailRef.current.value.trim() && passRef.current.value.trim()
        if (allDetailsFilled && accepted) {
            history.push("/");
        }
    };

    return (
        <form className="user-form" method="POST" onSubmit={submitHandler}>
            <div className="col-auto">
                <div className="card">
                    <div className="col-12" id="input-row-2">
                        <input type="text" className="form-control" placeholder="First Name" name="user-fname" ref={firstNameRef} required />
                        <input type="text" className="form-control" placeholder="Last Name" name="user-lname" ref={lastNameRef} required />
                    </div>

                    <div className="col-12">
                        <input type="text" className="form-control" id="staticEmail" placeholder="Email" name="login-email" ref={emailRef} required />
                    </div>

                    <div className="col-12">
                        <input type="password" className="form-control" id="inputPassword" placeholder="Password" name="login-pass" ref={passRef} required />
                    </div>

                    <div className="col-12">

                        <input type="checkbox" id="gridCheck" name="accept-conditions" onChange={handleChange} required />
                        <label htmlFor="gridCheck">
                            I certify that I'm at least 18 years old and that I agree to the Terms and Privacy Policy.
                        </label>
                    </div>

                    <div className={accepted ? "card-buttons" : "card-buttons-disabled"}>

                        <button type="submit" className={accepted ? "pills" : "pills-disabled"} >
                            Register
                        </button>
                    </div>

                </div>
            </div>
        </form>
    )
}

export default Register
