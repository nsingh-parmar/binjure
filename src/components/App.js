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
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../css/Card.css';
import '../css/Container.css';

function App() {

    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        fetch("/api/movies")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setMovies(data);
            })
            .catch((err) => {
                console.log(`Error ${err} while accessing Movies data`);
            });
    }, []);

    useEffect(() => {
        fetch("/api/series")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setSeries(data);
            })
            .catch((err) => {
                console.log(`Error ${err} while accessing Series data`);
            });
    }, []);

    useEffect(() => {
        fetch("/api/genres")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setGenres(data);
            })
            .catch((err) => {
                console.log(`Error ${err} while accessing Genres data`);
            });
    }, []);

    const getTrending = (listOfObjects) => {
        return listOfObjects.filter((media) => media.is_trending);
    }
    const allTrending = getTrending([...movies, ...series]);
    const allMedia = [...movies, ...series];
    const featuredMovies = movies.filter(movie => movie.is_featured);
    const featuredSeries = series.filter(serie => serie.is_featured);

    window.scrollTo(0, 0);

    return (
        <>
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/">
                        <Carousel data={allTrending} />
                        <Collection data={featuredMovies} type="featured movies" />
                        <Collection data={featuredSeries} type="featured shows" />
                        <Genres data={genres} type="genres" />
                    </Route>
                    <Route path="/movie/:id" children={<Detail mediaType="movies" />}></Route>
                    <Route path="/tv/:id" children={<Detail mediaType="series" />}></Route>
                    <Route path="/everything">
                        <Collection data={allMedia} type="everything" />
                    </Route>
                    <Route path="/movies">
                        <Collection data={movies} type="all movies" />
                    </Route>
                    <Route path="/shows">
                        <Collection data={series} type="all series" />
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
