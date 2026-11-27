package utils

import (
	"errors"
	"github.com/gofiber/fiber/v3"
	"gorm.io/gorm"
	"log"
)

func OK(c fiber.Ctx, code int, data any) error {
	return c.Status(code).JSON(fiber.Map{"sukses": true, "data": data})
}
func Fail(c fiber.Ctx, code int, msg string) error {
	return c.Status(code).JSON(fiber.Map{"sukses": false, "pesan": msg})
}
func DBError(c fiber.Ctx, err error) error {
	switch {
	case errors.Is(err, gorm.ErrRecordNotFound):
		return Fail(c, 404, "Data tidak ditemukan")
	case errors.Is(err, gorm.ErrDuplicatedKey):
		return Fail(c, 409, "Data sudah digunakan")
	case errors.Is(err, gorm.ErrForeignKeyViolated):
		return Fail(c, 409, "Data masih terhubung dengan data lain atau relasi tidak valid")
	default:
		log.Printf("database operation failed: %T", err)
		return Fail(c, 500, "Terjadi kesalahan server")
	}
}
func ErrorHandler(c fiber.Ctx, err error) error {
	var e *fiber.Error
	if errors.As(err, &e) && e.Code < 500 {
		return Fail(c, e.Code, e.Message)
	}
	log.Printf("request failed: %T", err)
	return Fail(c, 500, "Terjadi kesalahan server")
}
