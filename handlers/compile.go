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
			"message": "INVALID_REQUEST_BODY",
		})
	}

	task, err := services.GetTask(c, body.QuestionID)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "GET_TASK_FAILED",
		})
	}

	result, err := services.CheckResult(body.SourceCode, task.TestCases)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "CHECK_RESULT_FAILED",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Success",
		"result":  result,
	})
}
