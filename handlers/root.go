package handlers

import "github.com/gofiber/fiber/v2"

func Hello(c *fiber.Ctx) error {
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "This is a compiler API for CE BoostUp XI.📣",
	})
}
