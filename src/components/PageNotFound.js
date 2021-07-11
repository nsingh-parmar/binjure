import React from 'react'
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    window.scrollTo(0, 0);
    return (
        <>
            <div>
                <div id="message" className="card">
                    <span id="main">404</span>
                    <span id="subtext">Page Not Found</span>
                    <div className="card-buttons">
                        <Link to="/" className="pills">
                            Go Home
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PageNotFound
