import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../Style/MovieDetails.css'

export const MovieDetails = () => {

    const [movieDetails, setMovieDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const { imdbID } = useParams();

    useEffect(() => {
        setLoading(true)
        axios.get(`http://localhost:8080/movies/api/movies/${imdbID}`)
            .then((response) => {
                console.log(response.data);
                setMovieDetails(response.data)
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
              });
    }, [imdbID]);


    return (
        <div>
            {loading? (
                <h2>Loading....</h2>
            ) : (
                <div className="container">
                <h2>Movie Details</h2>
                <div>
                    <div className="moviecontent">
                        <div className="movieleft">
                            <img className="movie-details-poster" src={movieDetails.Poster} alt={movieDetails.Title} />
                        </div>
                        <div className="movieright">
                            <h3 className="movietitle">{movieDetails.Title}</h3>
                            <p><strong>Year : </strong>{movieDetails.Year}</p>
                            <p><strong>Type : </strong>{movieDetails.Type}</p>
                            <p><strong>Released : </strong> {movieDetails.Released}</p>
                            <p><strong>Genre : </strong> {movieDetails.Genre}</p>
                            <p><strong>Director :</strong> {movieDetails.Director}</p>
                            <p><strong>Writer :</strong> {movieDetails.Writer}</p>
                            <p><strong>Actors :</strong> {movieDetails.Actors}</p>
                            <p><strong>Ratings:</strong> {movieDetails.Ratings?.map((rating) => `${rating.Source} - ${rating.Value}`).join(', ')}</p>
                            <p><strong>Language :</strong> {movieDetails.Language}</p>
                            <p><strong>Plot :</strong> {movieDetails.Plot}</p>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>
    )
}
