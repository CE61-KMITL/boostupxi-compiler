package router

import (
	_ "boostupxi-compiler/docs"
	"boostupxi-compiler/handlers"
	"boostupxi-compiler/middlewares"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/swagger"
)

func SetupRoutes(app *fiber.App) {
	app.Get("/", handlers.Hello)

	compile := app.Group("/compile")
	compile.Post("/", middlewares.AuthMiddleware(), handlers.Compile)

	docs := app.Group("/docs")
	docs.Get("/*", swagger.HandlerDefault)
}
