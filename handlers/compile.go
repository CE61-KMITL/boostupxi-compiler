package handlers

import (
	"boostupxi-compiler/models"
	"boostupxi-compiler/services"
	"boostupxi-compiler/validation"

	"github.com/gofiber/fiber/v2"
)

func Compile(c *fiber.Ctx) error {

	body := new(models.CompileRequest)

	if err := validation.ValidateStruct(c, body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid body",
		})
	}

	task, err := services.GetTask(c, body.QuestionID)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to get task",
		})
	}

	services.CheckResult(body.SourceCode, task.TestCases)

	return c.Status(fiber.StatusOK).JSON(task)
}
