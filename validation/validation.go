package validation

import (
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

var validate = validator.New()

func Validate(c *fiber.Ctx, i interface{}) error {
	if err := c.BodyParser(i); err != nil {
		return err
	}

	if err := validate.Struct(i); err != nil {
		return err
	}

	return nil
}
