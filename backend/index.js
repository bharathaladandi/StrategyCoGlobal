require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect = require("./Config/db");


const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;


app.listen(PORT, async () => {
    try{
        await connect
        console.log("Connecting to DB Successfully");
    }
    catch(err){
        console.log("error while connecting to db", err);
    }

    console.log(`Listen on port ${PORT}`);
})