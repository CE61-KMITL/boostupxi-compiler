package handler

import (
	"boostupxi-compiler/model"
	"boostupxi-compiler/validation"

	"fmt"

	"github.com/gofiber/fiber/v2"
)

func Compile(c *fiber.Ctx) error {

	body := new(model.CompileRequest)

	if err := validation.ValidateStruct(c, body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid body",
		})
	}

	token := c.Get("Authorization")

	fmt.Println(token)

	return c.Status(fiber.StatusOK).JSON(body)
}
