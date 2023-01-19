package main

import (
	"cebuxi-grader/config"
	"log"

	"cebuxi-grader/router"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()

	app.Use(cors.New())

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("THIS IS A COMPILER OF GRADER WEBSITE FOR CE BOOSTUP XI.💡")
	})

	router.SetupRoutes(app)

	log.Fatal(app.Listen(":" + config.Config("PORT")))
}
