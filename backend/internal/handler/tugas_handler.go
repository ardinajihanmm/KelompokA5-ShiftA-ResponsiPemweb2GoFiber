package handler

import (
	"eventdesk/internal/middleware"
	"eventdesk/internal/model"
	"eventdesk/internal/utils"
	"github.com/gofiber/fiber/v3"
	"strings"
)

type tugasInput struct {
	KegiatanID uint   `json:"kegiatan_id" validate:"required"`
	UserID     uint   `json:"user_id" validate:"required"`
	NamaTugas  string `json:"nama_tugas" validate:"required,max=150"`
	Deskripsi  string `json:"deskripsi" validate:"max=1000"`
	Deadline   string `json:"deadline" validate:"required,datetime=2006-01-02"`
	Status     string `json:"status" validate:"required,oneof=belum dikerjakan selesai"`
}
type statusInput struct {
	Status string `json:"status" validate:"required,oneof=belum dikerjakan selesai"`
}

func (h Handler) ListTugas(c fiber.Ctx) error {
	rows := []model.Tugas{}
	if e := h.DB.Preload("Kegiatan").Preload("User").Order("id desc").Find(&rows).Error; e != nil {
		return utils.DBError(c, e)
	}
	return utils.OK(c, 200, rows)
}
func (h Handler) DetailTugas(c fiber.Ctx) error {
	id, e := idParam(c)
	if e != nil {
		return e
	}
	var m model.Tugas
	if e = h.DB.Preload("Kegiatan").Preload("User").First(&m, id).Error; e != nil {
		return utils.DBError(c, e)
	}
	return utils.OK(c, 200, m)
}
func (h Handler) saveTugas(c fiber.Ctx, update bool) error {
	var m model.Tugas
	if update {
		id, e := idParam(c)
		if e != nil {
			return e
		}
		if e = h.DB.First(&m, id).Error; e != nil {
			return utils.DBError(c, e)
		}
		if !middleware.IsAdmin(c) {
			if m.UserID != middleware.UserID(c) {
				return utils.Fail(c, 403, "Hanya dapat mengubah tugas sendiri")
			}
			var in statusInput
			if e = utils.Bind(c, &in); e != nil {
				return e
			}
			if e = h.DB.Model(&m).Update("status", in.Status).Error; e != nil {
				return utils.DBError(c, e)
			}
			return h.DetailTugas(c)
		}
	}
	var in tugasInput
	if e := utils.Bind(c, &in); e != nil {
		return e
	}
	if e := nonblank(in.NamaTugas); e != nil {
		return e
	}
	if e := exists[model.Kegiatan](h.DB, in.KegiatanID); e != nil {
		return e
	}
	if e := exists[model.User](h.DB, in.UserID); e != nil {
		return e
	}
	m.KegiatanID = in.KegiatanID
	m.UserID = in.UserID
	m.NamaTugas = strings.TrimSpace(in.NamaTugas)
	m.Deskripsi = in.Deskripsi
	m.Deadline = in.Deadline
	m.Status = in.Status
	code := 201
	if update {
		code = 200
		if e := h.DB.Save(&m).Error; e != nil {
			return utils.DBError(c, e)
		}
	} else {
		if e := h.DB.Create(&m).Error; e != nil {
			return utils.DBError(c, e)
		}
	}
	if e := h.DB.Preload("Kegiatan").Preload("User").First(&m, m.ID).Error; e != nil {
		return utils.DBError(c, e)
	}
	return utils.OK(c, code, m)
}
func (h Handler) CreateTugas(c fiber.Ctx) error { return h.saveTugas(c, false) }
func (h Handler) UpdateTugas(c fiber.Ctx) error { return h.saveTugas(c, true) }
func (h Handler) DeleteTugas(c fiber.Ctx) error { return remove[model.Tugas](c, h.DB) }
