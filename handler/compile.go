package handler

import "github.com/gofiber/fiber/v2"

func HelloCompile(c *fiber.Ctx) error {
	return c.SendString("THIS IS A COMPILER OF GRADER WEBSITE FOR CE BOOSTUP XI.💡")
}

func Compile(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"message": "Hello, Compile!",
	})
}
