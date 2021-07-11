import React from 'react';
import Media from './Media.js';

const Carousel = (props) => {

    const CarouselControls = () => {
        return (
            <>
                <a className="carousel-control-prev" href="#mediaCarousel" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#mediaCarousel" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </>
        );
    };

    const Contents = (props) => {
        const trending = props.data;
        return (
            <>
                <ol className="carousel-indicators">
                    {trending.map((media, index) =>
                        (index && (
                            <li key={media.id} data-target="#mediaCarousel" data-slide-to={"" + index} ></li>)
                        ) ||
                        (!index && (
                            <li key={media.id} data-target="#mediaCarousel" data-slide-to={"" + index} className="active"></li>)
                        )
                    )}
                </ol>
                <div className="carousel-inner">
                    {(trending.length === 0) && (<Media type="card-default" />)}
                    {trending.map((media, index) => (
                        <div key={media.id} className={index === 0 ? "carousel-item active" : "carousel-item"} >
                            <Media
                                key={media.id}
                                mediaID={media.id}
                                type="card"
                                title={media.title}
                                description={media.synopsis}
                                poster={media.poster_large}
                                textOverImg={true}
                            />

                        </div>
                    ))}
                </div>
                {trending.length <= 1 || (<CarouselControls />)}

            </>
        );
    };

    return (
        <div className="carousel-container">
            <h1>Trending</h1>
            <div id="mediaCarousel" className="carousel slide" data-ride="carousel">
                <Contents data={props.data} />
            </div>
        </div>
    )
}

export default Carousel;