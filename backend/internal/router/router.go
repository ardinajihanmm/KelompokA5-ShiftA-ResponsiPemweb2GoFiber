package router

import (
	"eventdesk/internal/handler"
	"eventdesk/internal/middleware"
	"eventdesk/internal/utils"
	"github.com/gofiber/fiber/v3"
)

func Setup(app *fiber.App, h handler.Handler) {
	api := app.Group("/api")
	api.Get("/status", func(c fiber.Ctx) error {
		sql, e := h.DB.DB()
		if e != nil || sql.Ping() != nil {
			return utils.Fail(c, 503, "Database tidak tersedia")
		}
		return utils.OK(c, 200, fiber.Map{"status": "online"})
	})
	auth := api.Group("/auth")
	auth.Post("/register", h.Register)
	auth.Post("/login", middleware.LoginRateLimit(), h.Login)
	auth.Get("/profile", middleware.Auth(h.Secret), h.Profile)
	secured := api.Group("", middleware.Auth(h.Secret))
	secured.Get("/users", middleware.Admin, h.Users)
	d := secured.Group("/divisi")
	d.Get("", h.ListDivisi)
	d.Get("/:id", h.DetailDivisi)
	d.Post("", middleware.Admin, h.CreateDivisi)
	d.Put("/:id", middleware.Admin, h.UpdateDivisi)
	d.Delete("/:id", middleware.Admin, h.DeleteDivisi)
	k := secured.Group("/kegiatan")
	k.Get("", h.ListKegiatan)
	k.Get("/:id", h.DetailKegiatan)
	k.Post("", middleware.Admin, h.CreateKegiatan)
	k.Put("/:id", middleware.Admin, h.UpdateKegiatan)
	k.Delete("/:id", middleware.Admin, h.DeleteKegiatan)
	t := secured.Group("/tugas")
	t.Get("", h.ListTugas)
	t.Get("/:id", h.DetailTugas)
	t.Post("", middleware.Admin, h.CreateTugas)
	t.Put("/:id", h.UpdateTugas)
	t.Delete("/:id", middleware.Admin, h.DeleteTugas)
}
