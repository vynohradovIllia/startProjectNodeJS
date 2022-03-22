const Emitter = require("events")
const emitter = new Emitter();
const dotenv = require("dotenv");
const express = require("express");

const app = express();
dotenv.config();

const eventNewUser = () => {
    emitter.on(event1, () => {
        console.log("emitter console");
        let city = "Kyiv";
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.WEATHER_KEY}`;

    });
};



module.exports = {
    eventNewUser, emitter
}