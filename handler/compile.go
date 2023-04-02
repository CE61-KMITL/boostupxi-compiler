package handler

import (
	"boostupxi-compiler/validation"

	"github.com/gofiber/fiber/v2"
)

func Compile(c *fiber.Ctx) error {
	type Body struct {
		SourceCode string `json:"source_code" validate:"required"`
		QuestionID string `json:"question_id" validate:"required"`
	}

	body := new(Body)

	if err := validation.Validate(c, body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid body",
		})
	}

	return c.Status(fiber.StatusOK).JSON(body)
}
