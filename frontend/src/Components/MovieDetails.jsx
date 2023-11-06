import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../Style/MovieDetails.css'

export const MovieDetails = () => {

    const [movieDetails, setMovieDetails] = useState([]);

    const { imdbID } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8080/movies/api/movie/${imdbID}`)
            .then((response) => {
                console.log(response.data);
                setMovieDetails(response.data)

            })
            .catch((err) => console.log({ movieerr: err }));

    }, [imdbID]);


    return (
        <div>
            <div>
                <h2>Movie Details</h2>
                <div>
                    <img src={movieDetails.Poster} alt={movieDetails.Title} />
                </div>
                <div>
                    <h3 >{movieDetails.Title}</h3>
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
    )
}
