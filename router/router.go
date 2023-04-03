package router

import (
	"boostupxi-compiler/handlers"
	"boostupxi-compiler/middlewares"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	app.Get("/", handlers.Hello)

	compile := app.Group("/compile")
	compile.Post("/", middlewares.AuthMiddleware(), handlers.Compile)
}
