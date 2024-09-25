const express = require("express")
const app = express()
const db = require("../db/connection")
const restRouter = require("../routes/restaurants")

//TODO: Create your GET Request Route Below:

app.use(express.json())
app.use(express.urlencoded())

app.use("/restaurants", restRouter)

module.exports = app
