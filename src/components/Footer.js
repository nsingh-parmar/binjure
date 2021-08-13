import React from 'react';
import SocialMedia from './SocialMedia';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer id="footer">
            <div className="footer" id="banner">
                <div className="card" >
                    <h2><Link to="/">Binjure</Link></h2>
                    <p className="card-text">Got a question? Contact us!</p>
                    <SocialMedia />
                    <div className="info-contents" >
                        <h1 style={{ borderRight: 'none' }}>&copy;2021 Binjure Inc.</h1>
                    </div>
                </div>
            </div>
            <div className="footer" id="info">
                <div className="card" >
                    <div className="info-contents">
                        <h1>Watch</h1>
                        <div className="card-buttons">
                            <Link to="/movies" className="pills">
                                Movies
                            </Link>
                        </div>
                        <div className="card-buttons">
                            <Link to="/series" className="pills">
                                TV Shows
                            </Link>
                        </div>
                        <div className="card-buttons">
                            <Link to="/everything" className="pills">
                                View all
                            </Link>
                        </div>
                    </div>
                    <div className="info-contents">

                        <h1>Browse</h1>
                        <div className="card-buttons">
                            <Link to="/genres" className="pills">
                                Genres
                            </Link>
                        </div>
                        <div className="card-buttons">
                            <Link to="/movies/featured" className="pills">
                                Featured Movies
                            </Link>
                        </div>
                        <div className="card-buttons">
                            <Link to="/series/featured" className="pills">
                                Featured Shows
                            </Link>
                        </div>
                    </div>
                    <div className="info-contents">

                        <h1>Company</h1>
                        <div className="card-buttons">
                            <Link to="/about" className="pills">
                                About Us
                            </Link>
                        </div>
                        <div className="card-buttons">
                            <Link to="/create" className="pills">
                                Add Your Own
                            </Link>
                        </div>
                        <div className="card-buttons">
                            <Link to="/" className="pills">
                                Careers
                            </Link>
                        </div>

                    </div>
                    <div className="info-contents">

                        <h1>Legal</h1>
                        <div className="card-buttons">
                            <Link to="/" className="pills">
                                Terms of use
                            </Link>
                        </div>
                        <div className="card-buttons">
                            <Link to="/" className="pills">
                                Privacy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
