package router

import (
	"eventdesk/internal/handler"
	"eventdesk/internal/utils"
	"github.com/gofiber/fiber/v3"
)

// Tahap fondasi: hanya status yang publik; CRUD menunggu autentikasi.
func Setup(app *fiber.App, h handler.Handler) {
	app.Get("/api/status", func(c fiber.Ctx) error {
		sql, e := h.DB.DB()
		if e != nil || sql.Ping() != nil {
			return utils.Fail(c, 503, "Database tidak tersedia")
		}
		return utils.OK(c, 200, fiber.Map{"status": "online"})
	})
}
