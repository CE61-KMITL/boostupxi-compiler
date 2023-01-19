package router

import (
	"cebuxi-grader/handler"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	compile := app.Group("/compile")
	compile.Get("/", handler.HelloCompile)
}
