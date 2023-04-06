package handlers

import (
	"boostupxi-compiler/models"
	"boostupxi-compiler/services"
	"boostupxi-compiler/utils"
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

	sourceCode, err := utils.CheckBannedLibrary(utils.CommentStripped(body.SourceCode))

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Banned library found",
		})
	}

	result, err := services.CheckResult(sourceCode, task.TestCases)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to check result",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Success",
		"result":  result,
	})
}
