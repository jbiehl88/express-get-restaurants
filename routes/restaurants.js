const express = require("express")
const { Restaurant } = require("../models/index")
const { check, validationResult } = require("express-validator")

const restRouter = express.Router()

restRouter.get("/", async (req, res) => {
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

restRouter.get("/:id", async (req, res) => {
	const restId = req.params.id
	let getRest = await Restaurant.findByPk(restId)
	res.json(getRest)
})

restRouter.post("/new", [check(["name", "location", "cuisine"]).not().isEmpty().trim()], async (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		res.json({ error: errors.array() })
	} else {
		const createRestaurant = await Restaurant.create(req.body)
		res.json(createRestaurant)
	}
})

restRouter.put("/:id", async (req, res) => {
	const restId = req.params.id
	const updateRest = await Restaurant.update(req.body, { where: { id: restId } })
	res.json(updateRest)
})

restRouter.delete("/:id", async (req, res) => {
	const restId = req.params.id
	const deletedRest = await Restaurant.destroy({ where: { id: restId } })
	res.json(deletedRest)
})

module.exports = restRouter
