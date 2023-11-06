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
        <div>
        <div>
            <h1>Movies</h1>
            <div>
                <input
                    type="text"
                    placeholder="Search for movies..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={handleSearchClick}>Search</button>
            </div>
            <div>
                {movies === undefined ?
                    <div>
                        No movie found please search another movie
                    </div>
                    :
                    <div>
                        {movies.map((movie) => (
                            <div key={movie.imdbID}>
                                <Link to={`/movies/${movie.imdbID}`}>
                                <img src={movie.Poster} alt={movie.Title}/>
                                <div>
                                    <p>{movie.Title}</p>
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