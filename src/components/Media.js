import React from 'react';
import { useHistory } from 'react-router-dom';

const Media = (props) => {
    const history = useHistory();
    const clickHandler = () => {
        if (props.hasOwnProperty("mediaID")) {
            const mediaID = props.mediaID;
            const mediaType = mediaID.slice(0, 3);
            if (mediaType === "mov") {
                history.push(`/movie/${mediaID}`);
            } else if (mediaType === "ser") {
                history.push(`/tv/${mediaID}`);
            } else {
                history.push(`/404`);
            }
        } else {
            alert("Nothing to see here. Check again later");
        }
    };

    return (
        <div className={props.type} id="poster" onClick={clickHandler} >
            {!props.textOverImg && <div className="card-header">{props.title}</div>}

            <div id={props.textOverImg ? "text-on-image" : "caption"} >
                {props.poster && <img src={props.poster} alt={`Poster for ${props.title}`} title={props.title} />}
                {props.textOverImg && <h1>{props.title}</h1>}
            </div>
        </div>
    )
}

Media.defaultProps = {
    "title": "No Media",
    "description": "Work in progress: we'll be back with your favorites",
    "type": "card"
}

export default Media;