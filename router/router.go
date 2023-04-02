package router

import (
	"boostupxi-compiler/handler"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	app.Get("/", handler.Hello)
}
