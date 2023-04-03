package handler

import (
	"boostupxi-compiler/model"
	"boostupxi-compiler/service"
	"boostupxi-compiler/validation"

	"github.com/gofiber/fiber/v2"
)

func Compile(c *fiber.Ctx) error {

	body := new(model.CompileRequest)

	if err := validation.ValidateStruct(c, body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid body",
		})
	}

	task, err := service.GetTask(c, body.QuestionID)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to get task",
		})
	}

	return c.Status(fiber.StatusOK).JSON(task)
}
