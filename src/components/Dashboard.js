import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Collection from './Collection';

const Dashboard = (props) => {
    const [currentUser, setCurrentUser] = useState({
        'firstName': '',
        'lastName': '',
        'email': '',
        'mediaBought': [],
        'mediaRented': [],
    });
    const [userBoughtItems, setUserBoughtItems] = useState([]);
    const [userRentedItems, setUserRentedItems] = useState([]);
    window.scrollTo(0, 0);
    useEffect(() => {

        const userSession = window.sessionStorage.getItem("uid");
        if (userSession) {
            const userInStore = JSON.parse(userSession).id;
            console.log(userInStore);
            fetch(`https://binjure-backend.herokuapp.com/api/users/${userInStore}`)
                .then((res) => {
                    return res.json();
                })
                .then((json) => {
                    setCurrentUser(json.body[0]);
                })
                .catch((err) => {
                    console.log(`Error: ${err}`);
                });
        }

    }, []);

    useEffect(() => {
        if (currentUser.hasOwnProperty("mediaBought")) {
            let boughtItems = [];
            props.data.forEach(media => {
                currentUser.mediaBought.forEach(item => {
                    if (item === media.id) {
                        boughtItems.push(media);
                    }
                });

            }
            );
            setUserBoughtItems(boughtItems);
        }
        if (currentUser.hasOwnProperty("mediaRented")) {
            let rentedItems = [];
            props.data.forEach(media => {
                currentUser.mediaRented.forEach(item => {
                    if (item === media.id) {
                        rentedItems.push(media);
                    }
                });
            });
            setUserRentedItems(rentedItems);
        }
    }, [currentUser, props.data]);

    return (
        <>
            <div>
                {currentUser && (
                    <div>
                        <div id="message" className="card">
                            <span id="dashboard-username">{currentUser.firstName} {currentUser.lastName}</span> <br />
                            <span id="dashboard-useremail" className="pills">{currentUser.email}</span>
                            <div className="card-buttons">
                                <Link to="/" className="pills">
                                    Go Home
                                </Link>
                            </div>
                        </div>
                        <div id="message" className="card">
                            {userBoughtItems.length ? (<Collection data={userBoughtItems} display="Your Bought Items" type="bought" />) : <Collection data={[]} display="No bought items" type="bought" />}
                            {userRentedItems.length ? (<Collection data={userRentedItems} display="Your Rented Items" type="rented" />) : <Collection data={[]} display="No rented items" type="rented" />}

                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Dashboard
