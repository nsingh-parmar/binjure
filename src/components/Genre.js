import React from 'react';
import Collection from './Collection';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Genre = (props) => {
    window.scrollTo(0, 0);
    const { name } = useParams();
    const allMedia = props.data
    const [data, setData] = useState({
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
        const filteredList = allMedia.filter((obj) => {
            return obj.genres.includes(name.trim());
        });

        setData(filteredList);
    }, [allMedia, name]);


    return (
        <Collection data={data} type={`Genre: ${name}`} />
    )
}

export default Genre
