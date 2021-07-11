import React from 'react';
import Media from './Media';
import { Link } from 'react-router-dom';

const Collection = (props) => {
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
                    {row.map(media => (
                        <Media
                            key={media.id}
                            mediaID={media.id}
                            type="card"
                            title={media.title}
                            description={media.synopsis}
                            poster={media.poster_small}
                            textOverImg={false}
                        />)
                    )}
                </div>
            ))}
            {
                ["movies", "shows"].includes(props.type) &&
                <div className="card-buttons">
                    <Link to="/everything" className="pills">
                        View all
                    </Link>
                </div>
            }
        </div>
    );
};

export default Collection;