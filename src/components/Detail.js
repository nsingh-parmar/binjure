import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const Detail = (props) => {
    let history = useHistory();
    const mediaType = props.mediaType;
    if (!["movies", "series"].includes(mediaType.toLowerCase())) {
        history.push("/404");
    }
    const { id } = useParams();
    const [selectedMedia, setSelectedMedia] = useState({
        id: '',
        title: '',
        synopsis: '',
        genres: [],
        runtime: 0,
        poster_small: '',
        poster_large: '',
        price_rent: 0,
        price_buy: 0,
        ratings: { metacritic: 0, rotten_tomatoes: 0 },
        is_featured: '',
        is_trending: '',
    });

    useEffect(() => {
        fetch(`/api/${mediaType}/${id}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setSelectedMedia(data);
            })
            .catch((err) => {
                console.log(`Error ${err} while accessing Movies data`);
                history.push("/404");
            });
    }, [id, mediaType, history]);

    window.scrollTo(0, 0);

    return (
        <div className="card-detail">
            <div id="poster-small" className="col-2">

                <img src={selectedMedia.poster_small} alt={`Small poster for ${selectedMedia.title}`} />
            </div>
            <div id="description" className="card col-4">
                <div className="card-header">
                    <div id="text">
                        <h1>{selectedMedia.title}</h1>

                    </div>
                    <div id="ratings">
                        <div className="icons centered" data-toggle="tooltip" data-placement="top" title="Metacritic Ratings">{selectedMedia.ratings.metacritic}%</div>
                        <div className="icons centered" data-toggle="tooltip" data-placement="top" title="Rotten Tomatoes Ratings">{selectedMedia.ratings.rotten_tomatoes}%</div>
                    </div>
                </div>
                <p className="card-text">{selectedMedia.synopsis}</p>
                <div style={{ display: "inline-flex" }}>
                    <button className="pills">Rent: ${selectedMedia.price_rent}</button>

                    <button className="pills">Buy: ${selectedMedia.price_buy}</button>
                </div>
            </div>

            <div id="poster-large" className="col">

                <img src={selectedMedia.poster_large} alt={`Larger poster for ${selectedMedia.title}`} />
            </div>

        </div>
    )
}


export default Detail;
