import Header from './Header';
import Footer from './Footer';
import Detail from './Detail';
import PageNotFound from './PageNotFound';
import Login from './Login';
import Register from './Register';
import Carousel from './Carousel';
import Collection from './Collection';
import About from './About';
import Genre from './Genre';
import Genres from './Genres';
import CreateMedia from './CreateMedia';
import Dashboard from './Dashboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../css/Card.css';
import '../css/Container.css';
import EditMedia from './EditMedia';


function App() {

    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [genres, setGenres] = useState([]);
    const [allTrending, setAllTrending] = useState([]);
    const [allMedia, setAllMedia] = useState([]);
    const [featuredMovies, setFeaturedMovies] = useState([]);
    const [featuredSeries, setFeaturedSeries] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        fetch("https://binjure-backend.herokuapp.com/api/movies")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                const movieData = data.body;
                setMovies(movieData);
            })
            .catch((err) => {
                console.log(`Error while accessing Movies data: ${err} `);
            });
    }, []);
    useEffect(() => {
        fetch("https://binjure-backend.herokuapp.com/api/movies/where?featured=true")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                const movieData = data.body;
                setFeaturedMovies(movieData);
            })
            .catch((err) => {
                console.log(`Error while accessing Featured Movies data: ${err} `);
            });
    }, []);
    useEffect(() => {
        fetch("https://binjure-backend.herokuapp.com/api/series")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                const seriesData = data.body;
                setSeries(seriesData);
            })
            .catch((err) => {
                console.log(`Error while accessing Series data: ${err}`);
            });
    }, []);
    useEffect(() => {
        fetch("https://binjure-backend.herokuapp.com/api/series/where?featured=true")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                const seriesData = data.body;
                setFeaturedSeries(seriesData);
            })
            .catch((err) => {
                console.log(`Error while accessing Featured Series data: ${err}`);
            });
    }, []);

    useEffect(() => {
        fetch("https://binjure-backend.herokuapp.com/api/genres")
            .then((res) => {
                return res.json();
            })
            .then((genresData) => {
                setGenres(genresData.body);
            })
            .catch((err) => {
                console.log(`Error while accessing Genres data: ${err}`);
            });
    }, []);

    const getTrending = (listOfObjects) => {
        return listOfObjects.filter((media) => media.trending);
    }

    useEffect(() => {
        const allMediaData = [...movies, ...series];
        setAllMedia(allMediaData);
        setAllTrending(getTrending(allMediaData));
    }, [movies, series]);

    const checkCurrentUser = () => {
        const userSession = window.sessionStorage.getItem("uid");
        if (userSession) {
            const userInStore = JSON.parse(userSession).id;
            if (userInStore) {
                return true;
            } else return false;
        } else return false;
    };
    const signOutUser = () => {
        sessionStorage.removeItem("uid");
        alert("Signed out!");
        window.location = "https://binjure.herokuapp.com/";
    }


    window.scrollTo(0, 0);

    return (
        <>
            <Router>
                <Header authorize={checkCurrentUser} signOutHandler={signOutUser} searchSetter={setSearchResults} />
                <Switch>
                    <Route exact path="/">
                        {allTrending.length !== 0 && <Carousel data={allTrending} />}
                        {featuredMovies.length !== 0 && <Collection data={featuredMovies} display="featured movies" type="movies" accessButtons={true} />}
                        {featuredSeries.length !== 0 && <Collection data={featuredSeries} display="featured series" type="series" accessButtons={true} />}
                        {genres.length !== 0 && <Genres data={genres} type="genres" />}
                    </Route>
                    <Route path="/movie/:id" children={<Detail mediaType="movies" />}></Route>
                    <Route path="/tv/:id" children={<Detail mediaType="series" />}></Route>
                    <Route path="/everything">
                        <Collection data={allMedia} type="everything" display="everything" />
                    </Route>
                    <Route path="/movies/featured">
                        <Collection data={featuredMovies} type="featured movies" display="Movies Featured" accessButtons={true} />
                    </Route>
                    <Route path="/series/featured">
                        <Collection data={featuredSeries} type="featured series" display="series Featured" accessButtons={true} />
                    </Route>
                    <Route path="/movies">
                        <Collection data={movies} type="movies" display="all movies" accessButtons={false} />
                    </Route>
                    <Route path="/series">
                        <Collection data={series} type="series" display="all series" accessButtons={false} />
                    </Route>
                    <Route path="/genres">
                        <Genres data={genres} type="genres" />
                    </Route>
                    <Route path="/genre/:name">
                        <Genre data={allMedia} />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/create">
                        <CreateMedia />
                    </Route>
                    <Route path="/search">
                        <Collection data={searchResults} type="everything" display="Search results" accessButtons={false} />
                    </Route>
                    <Route path="/edit/movies/:mediaID">
                        <EditMedia mediaType="movies" />
                    </Route>
                    <Route path="/edit/series/:mediaID">
                        <EditMedia mediaType="series" />
                    </Route>
                    <Route>
                        {checkCurrentUser() ? (
                            <Dashboard data={allMedia} />
                        ) : (
                            <PageNotFound />
                        )}
                    </Route>
                    <Route path="*">
                        <PageNotFound />
                    </Route>
                </Switch>
                <Footer />
            </Router>
        </>
    );
}

export default App;
