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
        const allDetailsFilled = emailRef.current.value.trim() && passRef.current.value.trim()
        if (allDetailsFilled) {
            history.push("/");
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
