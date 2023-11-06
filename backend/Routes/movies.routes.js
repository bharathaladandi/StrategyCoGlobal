require("dotenv").config();
const { default: axios } = require("axios");
const { Router } = require("express");

const MovieRouter = Router();

MovieRouter.get('/', (req, res) => {

    const searchQuery = req.query.search
    const apiKey = process.env.apiKey
    const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`

    axios.get(apiUrl)
        .then((responce) => res.json(responce.data))
        .catch((err) => res.status(500).json({err:"Failed to fetch data"}))

});

module.exports = { MovieRouter }