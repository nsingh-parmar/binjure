import React from 'react';
import { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Login = () => {
    const emailRef = useRef(null);
    const passRef = useRef(null);
    let history = useHistory();
    const forgotPassword = () => {
        if (emailRef.current.value.trim()) {
            alert("Your password reset instructions will be sent to your registered email address.");
            history.push("/");
        } else {
            alert("Enter an email address to send the instructions to reset your password.");
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const emailValue = emailRef.current.value.trim();
        const passValue = passRef.current.value.trim();
        const allDetailsFilled = emailValue && passValue;
        if (allDetailsFilled) {
            const userData = {
                email: emailValue,
                password: passValue
            };
            const payload = {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            };

            fetch("https://binjure-backend.herokuapp.com/authenticate", payload)
                .then((response) => {
                    console.log("Authenticating User");
                    return response.json();
                })
                .then((dataObj) => {
                    if (dataObj.hasOwnProperty("body")) {
                        if (dataObj.body.length === 1) {
                            alert("Login Success!");
                            const user = { "id": dataObj.body[0] };
                            sessionStorage.setItem("uid", JSON.stringify(user));
                            window.location = "https://binjure.herokuapp.com/dashboard";
                        }
                    } else {
                        if (dataObj.hasOwnProperty("message")) {
                            alert(dataObj.message);
                        } else if (dataObj.hasOwnProperty("status")) {
                            alert("Authentication failed.");
                        }
                    }
                })
                .catch((reason) => {
                    console.log(reason);
                    alert(`Sorry, we could not authenticate you.`);
                });
        } else {
            alert("Please fill all the details!");
        }
    };

    return (
        <form className="user-form" method="POST" onSubmit={submitHandler}>
            <div className="col-auto">
                <div className="card">
                    <div className="col-12">
                        <input type="text" className="form-control" id="staticEmail" placeholder="Email" name="login-email" ref={emailRef} required />
                    </div>

                    <div className="col-12">
                        <input type="password" className="form-control" id="inputPassword" placeholder="Password" name="login-pass" ref={passRef} required />
                    </div>

                    <div className="col-12">
                        <button className="btn btn-dark" id="forgot-password" onClick={forgotPassword}>Forgot Password?</button>
                    </div>

                    <div className="col-12">
                        <div className="card-buttons">
                            <button type="submit" className="pills">
                                Login
                            </button>
                        </div>
                        <div className="card-buttons">
                            <button className="pills">
                                <Link to="/register">
                                    Create a new account
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Login;
