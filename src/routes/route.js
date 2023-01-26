const express = require("express");
const path = require("path");

const routes = (app) => {
    app.use(express.static(path.join(__dirname,'..', '..')))    
    app.use(express.static(path.join(__dirname,'..')))
    app.route('/').get((req, res) => {
        res.status(200).sendFile('index.html')
    })
};

module.exports = routes 