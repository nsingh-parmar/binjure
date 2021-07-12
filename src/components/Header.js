import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark">
			<Link to="/" className="navbar-brand">binjure</Link>

			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>

			<div className="collapse navbar-collapse" id="navbarContent">
				<ul className="navbar-nav ml-auto" id="nav-buttons">
					<li><Link to="/movies">Movies</Link></li>
					<li><Link to="/shows">Series</Link></li>
					<li><Link to="/genres">Genres</Link></li>
				</ul>
				<ul className="navbar-nav ml-auto" id="nav-buttons">
					<li>
						<Link to="/login">Sign In</Link>
					</li>
					<li>
						<Link to="/register">Register</Link>
					</li>
				</ul>
			</div>
		</nav>
	)
}

export default Header
