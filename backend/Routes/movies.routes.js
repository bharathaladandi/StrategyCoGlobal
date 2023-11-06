require("dotenv").config();
const axios = require("axios");
const { Router } = require("express");

const MovieRouter = Router();

const apiKey = process.env.apiKey

MovieRouter.get('/api/movies', (req, res) => {

    const searchQuery = req.query.search;
    const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`

    axios.get(apiUrl)
        .then((response) => res.json(response.data))
        .catch((err) => res.status(500).json({err:"Failed to fetch data"}))

});

MovieRouter.get('/api/movies/:imdbID', (req, res) => {

    const imdbID = req.params.imdbID;
    const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`

    axios.get(apiUrl)
        .then((response) => res.json(response.data))
        .catch((err) => res.status(500).json({err:"Failed to fetch data"}))

});

module.exports = { MovieRouter }