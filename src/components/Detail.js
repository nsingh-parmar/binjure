import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa'

const Detail = (props) => {
    let history = useHistory();
    const mediaType = props.mediaType;
    if (!["movies", "series"].includes(mediaType.toLowerCase())) {
        history.push("/404");
    }
    const { id } = useParams();
    const requestURL = `https://binjure-backend.herokuapp.com/api/${mediaType}/${id}`
    const [selectedMedia, setSelectedMedia] = useState({
        id: '',
        title: '',
        synopsis: '',
        genres: [],
        runtime: 0,
        smallPoster: '',
        largePoster: '',
        rentPrice: 0,
        buyPrice: 0,
        ratings: { metacritic: 0, rotten_tomatoes: 0 },
        featured: '',
        trending: '',
    });

    useEffect(() => {
        fetch(requestURL)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                const mediaData = data.body;
                setSelectedMedia(mediaData[0]);
            })
            .catch((err) => {
                console.log(`Error while accessing Movies data: ${err}`);
                history.push("/404");
            });
    }, [id, mediaType, history, requestURL]);

    const defaultLargePoster = `/images/${mediaType.toLowerCase()}_large_default.png`;
    const defaultSmallPoster = `/images/${mediaType.toLowerCase()}_small_default.png`;

    window.scrollTo(0, 0);

    const editHandler = () => {
        history.push(`/edit/${mediaType}/${id}`);
    };

    const deleteHandler = () => {
        const toDelete = window.confirm("Are you sure you want to delete this?");
        if (toDelete) {
            const options = {
                method: "DELETE"
            };

            fetch(requestURL, options)
                .then((res) => {
                    return res.json();
                })
                .then((dataObj) => {
                    if (dataObj.hasOwnProperty("message")) {
                        alert(dataObj.message);
                        if (dataObj.message.search(/success/gi)) {
                            window.location = "https://binjure.herokuapp.com/";
                        }
                    } else if (dataObj.hasOwnProperty("status")) {
                        alert("Deletion failed.");
                    }
                })
                .catch((err) => {
                    console.log(`Error while accessing Movies data: ${err}`);
                    history.push("/404");
                });

        }
    };

    return (
        <div className="card-detail">
            <div id="poster-small" className="col-2">

                <img src={selectedMedia.smallPoster ? selectedMedia.smallPoster : defaultSmallPoster} alt={`Small poster for ${selectedMedia.title}`} />
            </div>
            <div id="description" className="card col-4">
                <div className="card-header">
                    <div id="text">
                        <h1>{selectedMedia.title}</h1>

                    </div>
                    <div id="action-buttons">
                        <div className="icons centered" data-toggle="tooltip" data-placement="top" title="Edit this" onClick={editHandler}><FaEdit /></div>
                        <div className="icons centered" data-toggle="tooltip" data-placement="top" title="Delete this" onClick={deleteHandler}><FaTrash /></div>
                    </div>
                </div>
                <p className="card-text">{selectedMedia.synopsis}</p>
                <div style={{ display: "inline-flex" }}>
                    <button className="pills">Rent: ${selectedMedia.rentPrice}</button>

                    <button className="pills">Buy: ${selectedMedia.buyPrice}</button>
                </div>
                <div id="ratings">
                    {selectedMedia.ratings.metacritic && <div className="icons centered" data-toggle="tooltip" data-placement="top" title="Metacritic Ratings">{selectedMedia.ratings.metacritic}%</div>}
                    {selectedMedia.ratings.rotten_tomatoes && <div className="icons centered" data-toggle="tooltip" data-placement="top" title="Rotten Tomatoes Ratings">{selectedMedia.ratings.rotten_tomatoes}%</div>}
                </div>
            </div>

            <div id="poster-large" className="col">

                <img src={selectedMedia.largePoster ? selectedMedia.largePoster : defaultLargePoster} alt={`Larger poster for ${selectedMedia.title}`} />
            </div>

        </div>
    )
}


export default Detail;
