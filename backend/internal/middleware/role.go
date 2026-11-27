package middleware

import (
	"eventdesk/internal/utils"
	"github.com/gofiber/fiber/v3"
)

func Admin(c fiber.Ctx) error {
	if !IsAdmin(c) {
		return utils.Fail(c, 403, "Akses khusus admin")
	}
	return c.Next()
}
