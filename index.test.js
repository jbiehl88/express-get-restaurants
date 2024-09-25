const request = require("supertest")
const app = require("./src/app.js")
const { Restaurant, Menu, Item } = require("./models/index")
const syncSeed = require("./seed.js")
const db = require("./db/connection.js")

beforeAll(async () => {
	await syncSeed()
})

afterAll(async () => {
	await db.sync({ force: true })
})

describe("Restaurant", () => {
	it("status code 200", async () => {
		const response = await request(app).get("/restaurants").expect(200)
	})
	it("test get all", async () => {
		const response = await request(app).get("/restaurants")
		expect(Array.isArray(response.body)).toBe(true)
		expect(response.body[0]).toHaveProperty("cuisine")
	})
	it("test number of rest", async () => {
		const response = await request(app).get("/restaurants")
		expect(response.body.length).toBe(3)
	})
	it("test correct data", async () => {
		const response = await request(app).get("/restaurants")
		expect(response.body).toContainEqual(
			expect.objectContaining({
				id: 1,
				name: "AppleBees",
				location: "Texas",
				cuisine: "FastFood",
			})
		)
	})
	it("test correct data per id", async () => {
		const response = await request(app).get("/restaurants/1")
		expect(response.body).toEqual(
			expect.objectContaining({
				id: 1,
				name: "AppleBees",
				location: "Texas",
				cuisine: "FastFood",
			})
		)
	})
	// it("add restaurant", async () => {
	// 	const response = await request(app).post("/restaurants/new").send({ name: "Taco Bell", location: "FW", cuisine: "AmeriMex" })
	// 	console.log(JSON.stringify(response, null, 2))
	// 	expect(response.body).toBe("Taco Bell")
	// })
	it("update endpoint", async () => {
		const response = await request(app).put("/restaurants/1").send({ name: "Taco Bell" })
		const restaurant = await Restaurant.findByPk(1)
		expect(restaurant.name).toBe("Taco Bell")
	})
	it("delete endpoint", async () => {
		const response = await request(app).delete("/restaurants/1")
		const restaurants = await Restaurant.findAll({})
		expect(restaurants[0].id).toEqual(2)
	})
	it("checks validator errors", async () => {
		const response = await request(app).post("/restaurants/new")
		expect(response.body.error).toContainEqual(
			expect.objectContaining({
				type: "field",
				msg: "Invalid value",
				path: "name",
				location: "body",
			})
		)
	})
})
