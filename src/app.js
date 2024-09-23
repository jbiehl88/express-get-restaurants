const express = require("express")
const app = express()
const Restaurant = require("../models/index")
const db = require("../db/connection")

//TODO: Create your GET Request Route Below:

app.use(express.json())
app.use(express.urlencoded())

app.get("/restaurants", async (req, res) => {
	let foundRestaurants = await Restaurant.findAll({})
	res.json(foundRestaurants)
})

app.get("/restaurants/:id", async (req, res) => {
	const restId = req.params.id
	let getRest = await Restaurant.findByPk(restId)
	res.json(getRest)
})

app.post("/restaurants/new", async (req, res) => {
	const createRestaurant = await Restaurant.create(req.body.Restaurant)
	res.send(`Restaurant Created!`)
})

app.put("/restaurants/:id", async (req, res) => {
	const restId = req.params.id
	const updateRest = await Restaurant.update(req.body, { where: { id: restId } })
	res.send("Restaurant Updated!")
})

app.delete("/restaurants/:id", async (req, res) => {
	const restId = req.params.id
	const deletedRest = await Restaurant.destroy({ where: { id: restId } })
	res.send("Restaurant Deleted!")
})

module.exports = app
