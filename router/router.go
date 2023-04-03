package router

import (
	"boostupxi-compiler/handler"
	"boostupxi-compiler/middleware"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	app.Get("/", handler.Hello)

	compile := app.Group("/compile")
	compile.Post("/", middleware.AuthMiddleware(), handler.Compile)
}
