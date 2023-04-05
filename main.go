package main

import (
	"boostupxi-compiler/config"
	"boostupxi-compiler/middlewares"
	"boostupxi-compiler/router"

	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()

	app.Use(middlewares.LoggerMiddleware())

	app.Use(cors.New(cors.Config{
		AllowOrigins: config.Config("ALLOWED_ORIGINS"),
		AllowMethods: "GET,POST,PUT,DELETE",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	router.SetupRoutes(app)

	log.Fatal(app.Listen(":" + config.Config("PORT")))
}
