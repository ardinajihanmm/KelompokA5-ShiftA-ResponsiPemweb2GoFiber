package handler

import (
	"eventdesk/internal/utils"
	"github.com/gofiber/fiber/v3"
	"gorm.io/gorm"
	"strconv"
	"strings"
)

type Handler struct {
	DB     *gorm.DB
	Secret string
}

func idParam(c fiber.Ctx) (uint, error) {
	id, e := strconv.ParseUint(c.Params("id"), 10, 64)
	if e != nil || id == 0 {
		return 0, fiber.NewError(422, "ID tidak valid")
	}
	return uint(id), nil
}
func nonblank(s string) error {
	if strings.TrimSpace(s) == "" {
		return fiber.NewError(422, "Nama tidak boleh kosong")
	}
	return nil
}
func remove[T any](c fiber.Ctx, db *gorm.DB) error {
	id, e := idParam(c)
	if e != nil {
		return e
	}
	var m T
	res := db.Delete(&m, id)
	if res.Error != nil {
		return utils.DBError(c, res.Error)
	}
	if res.RowsAffected == 0 {
		return utils.Fail(c, 404, "Data tidak ditemukan")
	}
	return utils.OK(c, 200, fiber.Map{"pesan": "Data dihapus"})
}
func exists[T any](db *gorm.DB, id uint) error {
	var m T
	err := db.First(&m, id).Error
	if err == gorm.ErrRecordNotFound {
		return fiber.NewError(422, "Data relasi tidak ditemukan")
	}
	return err
}
