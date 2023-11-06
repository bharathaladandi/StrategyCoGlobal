import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Style/MovieList.css'

export const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");
    const [searchMovie, setSearchMovie] = useState('');


    useEffect(() => {

        if (searchMovie) {
            // Fetch data after search
            axios.get(`http://localhost:8080/movies/api/movies?search=${searchMovie}`)
                .then((response) => {
                    setMovies(response.data.Search)
                    console.log(response.data.Search);
                })
                .catch((err) => console.log(err));
        }
        else {
            // Fetch default data
            axios.get('http://localhost:8080/movies/api/movies?search=Avengers')
                .then((response) => {
                    setMovies(response.data.Search)
                    console.log(response.data.Search);
                })
                .catch((error) => console.error(error));
        }


    }, [searchMovie]);

    const handleSearchClick = () => {
        setSearchMovie(search);
    };

    return (
        <div className="container">
        <div>
            <h1 className="title">Movies</h1>
            <div className="searchcon">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={handleSearchClick}>Search</button>
            </div>
            <div className="containersecound">
                {movies === undefined ?
                    <div className="title">
                        No movie found please search another movie
                    </div>
                    :
                    <div className="grid">
                        {movies.map((movie) => (
                            <div key={movie.imdbID} className="card">
                                <Link to={`/movies/${movie.imdbID}`} className="movielink">
                                <img src={movie.Poster} alt={movie.Title} className="movieImage" />
                                <div className="movieinfo">
                                    <p className="movietitle">{movie.Title}</p>
                                </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                }

            </div>
        </div>

        </div>
    )
}