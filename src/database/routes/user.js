const { read, post, put } = require("../user/controller")
const express = require('express')

const router = express.Router()

router
    .get('/user/:number', read)
    .post("/user", post)
    .put("/user/:number", put)

module.exports = router 