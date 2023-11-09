import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Style/MovieList.css'

export const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");
    const [searchMovie, setSearchMovie] = useState('');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {

        setLoading(true)
        if (searchMovie) {
            // Fetch data after search
            axios.get(`https://shy-ruby-duckling-sock.cyclic.app/movies/api/movies?search=${searchMovie}&page=${page}`)
                .then((response) => {
                    setMovies(response.data.Search)
                    setTotalPage(response.data.totalResults || 0);
                    setLoading(false)
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                });
        }
        else {
            // Fetch default data
            axios.get(`https://shy-ruby-duckling-sock.cyclic.app/movies/api/movies?search=Avengers&page=${page}`)
                .then((response) => {
                    setMovies(response.data.Search || []);
                    setTotalPage(response.data.totalResults || 0);
                    setLoading(false)
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                })
        }

        setSearch("")

    }, [searchMovie, page]);

    const handleSearchClick = () => {
        setSearchMovie(search);
        setPage(1);
    };

    return (

        <div className="container">
            <div>
                <header>
                    <h1>Movie Browsing App</h1>
                </header>
                <div className="searchcon">
                    <input
                        type="text"
                        placeholder="Search for movies..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button onClick={handleSearchClick}>Search</button>
                </div>

                {loading ? (
                    <h2 className='loading'>Loading....</h2>
                ) : (
                    <div className="containersecound">
                        {movies === undefined ?
                            <div className="title">
                                No movie found please search another movie
                            </div>
                            :
                            <div>
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
                                {totalPage > 10 && (
                                    <div className="pagination">
                                        <button onClick={() => setPage(page - 1)} disabled={page === 1} className="paginationbtn">
                                            Previous
                                        </button>

                                        <span className="paginationinfo">Page : {page}</span>

                                        <button onClick={() => setPage(page + 1)} disabled={page * 10 >= totalPage} className="paginationbtn">
                                            Next
                                        </button>
                                    </div>
                                )}

                            </div>
                        }

                    </div>
                )}

            </div>
        </div >
    )
}