const express = require("express")
const app = express()
const { Restaurant, Menu, Item } = require("../models/index")
const db = require("../db/connection")

//TODO: Create your GET Request Route Below:

app.use(express.json())
app.use(express.urlencoded())

app.get("/restaurants", async (req, res) => {
	let foundRestaurants = await Restaurant.findAll({
		include: [
			{
				model: Menu, // Argument 1: Including Menus
				include: [
					{
						model: Item, // Argument 2: Including MenuItems within Menus
					},
				],
			},
		],
	})
	res.json(foundRestaurants)
})

app.get("/restaurants/:id", async (req, res) => {
	const restId = req.params.id
	let getRest = await Restaurant.findByPk(restId)
	res.json(getRest)
})

app.post("/restaurants/new", async (req, res) => {
	const createRestaurant = await Restaurant.create(req.body.Restaurant)
	res.json(createRestaurant)
})

app.put("/restaurants/:id", async (req, res) => {
	const restId = req.params.id
	const updateRest = await Restaurant.update(req.body, { where: { id: restId } })
	res.json(updateRest)
})

app.delete("/restaurants/:id", async (req, res) => {
	const restId = req.params.id
	const deletedRest = await Restaurant.destroy({ where: { id: restId } })
	res.json(deletedRest)
})

module.exports = app
