import React from 'react';
import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

const Register = () => {
    const [accepted, setAccepted] = useState(false);
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        mediaBought: [],
        mediaRented: [],
    });
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const passRef = useRef(null);
    let history = useHistory();

    const handleChange = (e) => {
        const newData = { ...userData };
        if (e.target.hasOwnProperty("value")) {
            newData[e.target.id] = e.target.value;
        } else if (e.target.hasOwnProperty("checked")) {
            const isAccepted = e.target.checked;
            if (isAccepted) {
                setAccepted(true);
            } else {
                setAccepted(false);
            }
        }
        setUserData(newData);
    };

    const isEmail = (email) => {
        var regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regexp.test(String(email).toLowerCase());
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const firstName = firstNameRef.current.value.trim();
        const lastName = lastNameRef.current.value.trim();
        const email = emailRef.current.value.trim();
        const password = passRef.current.value.trim();
        if (firstName.search(/[^a-zA-Z]/g) >= 0) {
            alert("Firstname field only accepts alphabets.");
        } else if (lastName.search(/[^a-zA-Z]/g) >= 0) {
            alert("Lastname field only accepts alphabets.");
        } else if (!isEmail(email)) {
            alert("Please enter a valid email address");
        } else {

            const allDetailsFilled = firstName && lastName && email && password;
            if (allDetailsFilled && accepted) {
                const payload = {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData),
                };

                fetch("https://binjure-backend.herokuapp.com/api/users", payload)
                    .then((response) => {
                        console.log("Creating User");
                    })
                    .then(() => {
                        alert("You have been registered. Welcome!")
                        history.push("/login");
                    })
                    .catch((reason) => {
                        alert(`Could not create user because: ${reason}`);
                    });
            }
        }
    };

    return (
        <form className="user-form" method="POST" onSubmit={submitHandler}>
            <div className="col-auto">
                <div className="card">
                    <div className="col-12" id="input-row-2">
                        <input type="text" className="form-control" id="firstName" placeholder="First Name" name="firstName" ref={firstNameRef} onChange={handleChange} required />
                        <input type="text" className="form-control" id="lastName" placeholder="Last Name" name="lastName" ref={lastNameRef} onChange={handleChange} required />
                    </div>

                    <div className="col-12">
                        <input type="text" className="form-control" id="email" placeholder="Email" name="email" ref={emailRef} onChange={handleChange} required />
                    </div>

                    <div className="col-12">
                        <input type="password" className="form-control" id="password" placeholder="Password" name="password" ref={passRef} onChange={handleChange} required />
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
