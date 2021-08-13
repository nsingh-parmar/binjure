import React from 'react'
import { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { RiSearch2Line } from 'react-icons/ri'

const Header = (props) => {

	const searchRef = useRef(null);
	const history = useHistory();

	const searchMedia = () => {
		const value = searchRef.current.value.trim();
		fetch(`https://binjure-backend.herokuapp.com/api/search?title=${value}`)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				// setGenres(data);
				props.searchSetter(data.body);
				history.push("/search");
			})
			.catch((err) => {
				console.log(`Error while accessing Genres data: ${err}`);
			});
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-dark">
			<Link to="/" className="navbar-brand">binjure</Link>

			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>

			<form className="user-form" data-target="#navbarContent">

				<div id="search-bar">
					<input type="text" className="form-control" ref={searchRef} />
					<div className="icons centered" onClick={searchMedia}><RiSearch2Line /></div>
				</div>
			</form>

			<div className="collapse navbar-collapse" id="navbarContent">
				<ul className="navbar-nav ml-auto" id="nav-buttons">
					<li><Link to="/movies">Movies</Link></li>
					<li><Link to="/series">Series</Link></li>
					<li><Link to="/genres">Genres</Link></li>
					<li><Link to="/create">Add Media</Link></li>
				</ul>
				<ul className="navbar-nav ml-auto" id="nav-buttons">
					<li>
						{props.authorize() ? <Link to="/dashboard">Dashboard</Link> : <Link to="/login">Sign In</Link>}
					</li>
					<li>
						{props.authorize() ? <Link to="/" onClick={props.signOutHandler}>Sign Out</Link> : <Link to="/register">Register</Link>}
						{/* <Link to="/register">Register</Link> */}
					</li>
				</ul>
			</div>
		</nav>
	)
}

export default Header
