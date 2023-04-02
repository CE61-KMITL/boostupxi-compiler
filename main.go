package main

import (
	"boostupxi-compiler/config"

	"log"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, Compiler!")
	})

	log.Fatal(app.Listen(":" + config.Config("PORT")))
}
