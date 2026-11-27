package main

import (
	"eventdesk/internal/config"
	"eventdesk/internal/handler"
	"eventdesk/internal/middleware"
	"eventdesk/internal/router"
	"eventdesk/internal/utils"
	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/logger"
	"github.com/gofiber/fiber/v3/middleware/recover"
	"log"
)

func main() {
	cfg, e := config.Load()
	if e != nil {
		log.Fatal(e)
	}
	db, e := config.Open(cfg)
	if e != nil {
		log.Fatal("database initialization failed: ", e)
	}
	app := fiber.New(fiber.Config{ErrorHandler: utils.ErrorHandler})
	app.Use(recover.New())
	app.Use(logger.New())
	app.Use(middleware.CORS(cfg.Origin))
	router.Setup(app, handler.Handler{DB: db, Secret: cfg.JWTSecret})
	log.Fatal(app.Listen(":" + cfg.Port))
}
