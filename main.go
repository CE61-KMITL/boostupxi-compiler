package main

import "github.com/gofiber/fiber/v2"

func main() {
	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("THIS IS A COMPILER OF GRADER WEBSITE FOR CE BOOSTUP XI.💡")
	})

	app.Listen(":3000")
}
