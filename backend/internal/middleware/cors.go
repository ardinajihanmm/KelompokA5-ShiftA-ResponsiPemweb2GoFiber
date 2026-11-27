package middleware

import (
	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"
	"strings"
)

func CORS(origin string) fiber.Handler {
	return cors.New(cors.Config{AllowOrigins: strings.Split(origin, ","), AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}, AllowHeaders: []string{"Origin", "Content-Type", "Accept", "Authorization"}})
}
