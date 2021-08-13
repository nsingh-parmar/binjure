import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditMedia = (props) => {
    const [accepted, setAccepted] = useState(false);
    const [data, setData] = useState();
    const { mediaID } = useParams();
    const typeOfMedia = props.mediaType;
    const mediaTitle = useRef(null);
    const mediaSynopsis = useRef(null);
    const rentPrice = useRef(null);
    const buyPrice = useRef(null);
    const mediaType = useRef(null);
    const smallPoster = useRef(null);
    const largePoster = useRef(null);
    const mediaGenre = useRef(null);

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
        featured: false,
        trending: false,
    });

    useEffect(() => {
        fetch(`https://binjure-backend.herokuapp.com/api/${typeOfMedia}/${mediaID}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                const mediaData = data.body;
                setSelectedMedia(mediaData[0]);
                setData(mediaData[0]);
            })
            .catch((err) => {
                console.log(`Error while accessing Movies data: ${err}`);
            });
    }, [mediaID, typeOfMedia]);

    useEffect(() => {
        setAccepted(selectedMedia.featured);
    }, [selectedMedia]);

    const handleChange = (event) => {
        const newData = { ...data };
        if (event.target.hasOwnProperty("value")) {
            if (["rentPrice", "buyPrice"].includes(event.target.id)) {
                newData[event.target.id] = Number(event.target.value);
            } else {
                newData[event.target.id] = event.target.value;
            }
        } else if (event.target.hasOwnProperty("checked")) {
            const isAccepted = event.target.checked;
            if (isAccepted) {
                setAccepted(true);
            } else {
                setAccepted(false);
            }

        }
        setData(newData);
    };

    const getUpdatedCheck = () => {
        const newData = { ...data };
        newData.featured = accepted;
        return newData;
    }

    useEffect(() => {
        setData(getUpdatedCheck());
    }, [accepted]);

    const submitHandler = (e) => {
        e.preventDefault();
        const title = mediaTitle.current.value.trim();
        // const synopsis = mediaSynopsis.current.value.trim();
        const rent = rentPrice.current.value.trim();
        const buy = buyPrice.current.value.trim();
        const type = mediaType.current.value.trim().toLowerCase();
        const genre = mediaGenre.current.value.trim();
        const allDetailsFilled = title && rent && buy && type && genre;
        if (rent.search(/[^\d\.?]/g) >= 0) {
            alert("Rent price value should numeric");
        } else if ((rent.match(new RegExp(/\./, "g")) || []).length > 1) {
            alert("Rent price has too many decimal points");
        } else if (buy.search(/[^\d\.?]/g) >= 0) {
            alert("Buying price value should numeric");
        } else if ((buy.match(new RegExp(/\./, "g")) || []).length > 1) {
            alert("Buy price has too many decimal points");
        } else {
            if (allDetailsFilled) {

                const payload = {
                    method: "PUT",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                };

                fetch(`https://binjure-backend.herokuapp.com/api/${typeOfMedia}/${mediaID}`, payload)
                    .then((response) => {
                    })
                    .then(() => {
                        alert("Your response has been recorded! Thank you.")
                        window.location = "https://binjure.herokuapp.com/";
                    })
                    .catch((reason) => {
                        alert(`Could not update this because: ${reason}`);
                    });
            }
            else {
                alert("Please fill all the details.");
            }
        }
    };
    window.scrollTo(0, 0);
    return (
        <form className="user-form" >
            <div className="col-auto">
                <div className="card">
                    <div className="col-10" id="input-row-2">
                        <label htmlFor="title">Title</label>
                        <input type="text" defaultValue={selectedMedia.title} onChange={(val) => handleChange(val)} id="title" className="form-control" placeholder="Title" name="mediaTitle" ref={mediaTitle} required />
                    </div>

                    <div className="col-10">
                        <label htmlFor="synopsis">Synopsis</label>
                        <textarea rows="5" defaultValue={selectedMedia.synopsis} className="form-control" id="synopsis" onChange={(val) => handleChange(val)} placeholder="Synopsis" name="mediaSynopsis" ref={mediaSynopsis} ></textarea>
                    </div>

                    <div className="col-10">
                        <label htmlFor="rentPrice">Rent Price ({selectedMedia.rentPrice})</label>
                        <input type="text" onChange={(val) => handleChange(val)} className="form-control" id="rentPrice" placeholder="Rent Price" name="rentPrice" ref={rentPrice} required />
                    </div>

                    <div className="col-10">
                        <label htmlFor="buyPrice">Buy Price ({selectedMedia.buyPrice})</label>
                        <input type="text" onChange={(val) => handleChange(val)} className="form-control" id="buyPrice" placeholder="Buy Price" name="buyPrice" ref={buyPrice} required />
                    </div>

                    <div className="col-10" id="input-row-2">
                        <label htmlFor="smallPoster">Small Poster Path</label>
                        <input type="text" className="form-control" defaultValue={selectedMedia.smallPoster} onChange={(val) => handleChange(val)} placeholder="Small poster path" id="smallPoster" name="smallPoster" ref={smallPoster} readOnly />
                    </div>

                    <div className="col-10">
                        <label htmlFor="largePoster">Large Poster Path</label>
                        <input type="text" className="form-control" defaultValue={selectedMedia.largePoster} onChange={(val) => handleChange(val)} placeholder="Large poster path" id="largePoster" name="largePoster" ref={largePoster} readOnly />
                    </div>

                    <div className="col-10">
                        <label htmlFor="mediaType" id="mediaType">Media Type</label>
                        <input type="text" className="form-control" ref={mediaType} defaultValue={typeOfMedia} readOnly />
                        {/* <option>Movies</option>
                            <option>Series</option>
                        </select> */}
                    </div>

                    <div className="col-10">
                        <label htmlFor="mediaType">Genre</label>
                        <input type="text" className="form-control" ref={mediaGenre} defaultValue={selectedMedia.genre} onChange={(val) => handleChange(val)} id="genre" />
                        {/* <option>Mini-series</option>
                            <option>Animation</option>
                            <option>Special</option>
                            <option>Drama</option>
                            <option>Crime</option>
                            <option>Mystery</option>
                            <option>Thriller</option>
                            <option>Comedy</option>
                            <option>Action</option>
                            <option>Documentary</option>
                            <option>Superhero</option>
                            <option>Satire</option>
                            <option>Horror</option>
                            <option>Musical</option>
                            <option>Adventure</option>
                            <option>Fantasy</option>
                            <option>Music</option>
                            <option>Black Comedy</option>
                            <option>Romance</option>
                            <option>Sci-Fi</option>
                        </select> */}
                    </div>

                    <div className="col-10">
                        <input type="checkbox" id="featured" className="form-control" name="accept-conditions" checked={accepted ? "checked" : ""} onChange={handleChange} />
                        <label htmlFor="gridCheck">
                            Is this a featured item?
                        </label>
                    </div>

                    <div className="card-buttons">

                        <button className="pills" type="submit" onClick={submitHandler} >
                            Edit Media
                        </button>
                    </div>

                </div>
            </div>
        </form>
    )
}

export default EditMedia;