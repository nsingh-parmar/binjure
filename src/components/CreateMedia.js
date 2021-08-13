import React from 'react'
import { useState, useRef } from 'react';

const CreateMedia = () => {
    const [accepted, setAccepted] = useState(false);
    const mediaTitle = useRef(null);
    const mediaSynopsis = useRef(null);
    const rentPrice = useRef(null);
    const buyPrice = useRef(null);
    const mediaType = useRef(null);
    const smallPoster = useRef(null);
    const largePoster = useRef(null);
    const mediaGenre = useRef(null);
    window.scrollTo(0, 0);
    const handleChange = (e) => {
        const isAccepted = e.target.checked;
        if (isAccepted) {
            setAccepted(true);
        } else {
            setAccepted(false);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const title = mediaTitle.current.value.trim();
        const synopsis = mediaSynopsis.current.value.trim();
        const rent = rentPrice.current.value.trim();
        const buy = buyPrice.current.value.trim();
        const type = mediaType.current.value.trim().toLowerCase();
        const genre = mediaGenre.current.value.trim();
        const allDetailsFilled = title && rent && buy && type && genre;
        if (allDetailsFilled) {
            const data = {
                buyPrice: buy,
                rentPrice: rent,
                genre: genre,
                genres: [genre],
                ratings: {
                    metacritic: "",
                    rotten_tomatoes: "",
                },
                runtime: "",
                smallPoster: `/images/${type}_small_default.png`,
                largePoster: `/images/${type}_large_default.png`,
                title: title,
                synopsis: synopsis,
                featured: accepted,
                trending: false,
            };

            const payload = {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            };

            fetch(`https://binjure-backend.herokuapp.com/api/${type}`, payload)
                .then((response) => {
                    console.log("Created Media");
                })
                .then(() => {
                    alert("Your response has been recorded! Thank you.")
                    window.location = "https://binjure.herokuapp.com/";
                });

        } else {
            alert("Please fill all the details.");
        }
    };
    return (
        <form className="user-form" >
            <div className="col-auto">
                <div className="card">
                    <div className="col-10" id="input-row-2">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" placeholder="Title" name="mediaTitle" ref={mediaTitle} required />
                    </div>

                    <div className="col-10">
                        <label htmlFor="synopsis">Synopsis</label>
                        <textarea rows="5" className="form-control" placeholder="Synopsis" name="mediaSynopsis" ref={mediaSynopsis} ></textarea>
                    </div>

                    <div className="col-10">
                        <label htmlFor="rentPrice">Rent Price</label>
                        <input type="number" step="0.5" min="0" className="form-control" id="rentPrice" placeholder="Rent Price" name="rentPrice" ref={rentPrice} required />
                    </div>

                    <div className="col-10">
                        <label htmlFor="rentPrice">Buy Price</label>
                        <input type="number" step="0.5" min="0" className="form-control" id="buyPrice" placeholder="Buy Price" name="buyPrice" ref={buyPrice} required />
                    </div>

                    <div className="col-10" id="input-row-2">
                        <label htmlFor="smallPoster">Small Poster Path</label>
                        <input type="text" className="form-control" placeholder="Small poster path" id="smallPoster" name="smallPoster" ref={smallPoster} />
                    </div>

                    <div className="col-10">
                        <label htmlFor="largePoster">Large Poster Path</label>
                        <input type="text" className="form-control" placeholder="Large poster path" id="largePoster" name="largePoster" ref={largePoster} />
                    </div>

                    <div className="col-10">
                        <label htmlFor="mediaType">Media Type</label>
                        <select ref={mediaType} className="form-control">
                            <option>Movies</option>
                            <option>Series</option>
                        </select>
                    </div>

                    <div className="col-10">
                        <label htmlFor="mediaType">Genre</label>
                        <select ref={mediaGenre} className="form-control">
                            <option>Mini-series</option>
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
                        </select>
                    </div>

                    <div className="col-10">
                        <input type="checkbox" id="gridCheck" name="accept-conditions" onChange={handleChange} />
                        <label htmlFor="gridCheck">
                            Is this a featured item?
                        </label>
                    </div>

                    <div className="card-buttons">

                        <button className="pills" type="submit" onClick={submitHandler} >
                            Add Media
                        </button>
                    </div>

                </div>
            </div>
        </form>
    )
}

export default CreateMedia
