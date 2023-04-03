package middleware

import (
	"log"
	"os"
	"path/filepath"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func LoggerMiddleware() fiber.Handler {

	if err := os.MkdirAll("./logs", 0755); err != nil {
		log.Fatalln("Failed to create log directory")
	}

	logFilePath := filepath.Join("./logs", "reqLog.log")
	logFile, err := os.OpenFile(logFilePath, os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)

	if err != nil {
		log.Fatalln("Failed to open log file")
	}

	return logger.New(logger.Config{
		Output:     logFile,
		TimeFormat: "02-01-2006 15:04:05",
		TimeZone:   "Asia/Bangkok",
		Format:     "${time}\t${status}\t${method}\t${path}\t${ip}\t${latency}\n",
	})
}
