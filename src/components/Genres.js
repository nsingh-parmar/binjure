import React from 'react';
import Media from './Media';
import { Link } from 'react-router-dom';

const Genres = (props) => {
    window.scrollTo(0, 0);
    let rows = [];
    const chunks = 4;
    for (let i = 0; i < props.data.length; i += chunks) {
        rows.push(props.data.slice(i, chunks + i));
    }

    return (
        <div className="media-container">
            <div className="media-title">
                <h1>{props.type}</h1>
            </div>
            {rows.length === 0 && (<Media type="card-default" />)}
            {rows.map((row, i) => (
                <div className="media-row" key={i}>
                    {row.map((genre, j) => (
                        <div className="card" key={"" + i + j} >
                            <Link to={`/genre/${genre}`} className="card-buttons">
                                <h1>{genre}</h1>
                            </Link>
                        </div>
                    ))}

                </div>
            ))}
        </div>

    );
}

export default Genres;
