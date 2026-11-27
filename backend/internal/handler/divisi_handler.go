package handler

import (
	"eventdesk/internal/model"
	"eventdesk/internal/utils"
	"github.com/gofiber/fiber/v3"
	"strings"
)

type divisiInput struct {
	NamaDivisi string `json:"nama_divisi" validate:"required,max=100"`
	Deskripsi  string `json:"deskripsi" validate:"max=1000"`
}

func (h Handler) ListDivisi(c fiber.Ctx) error {
	rows := []model.Divisi{}
	if e := h.DB.Order("id desc").Find(&rows).Error; e != nil {
		return utils.DBError(c, e)
	}
	return utils.OK(c, 200, rows)
}
func (h Handler) DetailDivisi(c fiber.Ctx) error {
	id, e := idParam(c)
	if e != nil {
		return e
	}
	var m model.Divisi
	if e = h.DB.First(&m, id).Error; e != nil {
		return utils.DBError(c, e)
	}
	return utils.OK(c, 200, m)
}
func (h Handler) CreateDivisi(c fiber.Ctx) error {
	var in divisiInput
	if e := utils.Bind(c, &in); e != nil {
		return e
	}
	if e := nonblank(in.NamaDivisi); e != nil {
		return e
	}
	m := model.Divisi{NamaDivisi: strings.TrimSpace(in.NamaDivisi), Deskripsi: in.Deskripsi}
	if e := h.DB.Create(&m).Error; e != nil {
		return utils.DBError(c, e)
	}
	return utils.OK(c, 201, m)
}
func (h Handler) UpdateDivisi(c fiber.Ctx) error {
	id, e := idParam(c)
	if e != nil {
		return e
	}
	var m model.Divisi
	if e = h.DB.First(&m, id).Error; e != nil {
		return utils.DBError(c, e)
	}
	var in divisiInput
	if e = utils.Bind(c, &in); e != nil {
		return e
	}
	if e = nonblank(in.NamaDivisi); e != nil {
		return e
	}
	m.NamaDivisi = strings.TrimSpace(in.NamaDivisi)
	m.Deskripsi = in.Deskripsi
	if e = h.DB.Save(&m).Error; e != nil {
		return utils.DBError(c, e)
	}
	return utils.OK(c, 200, m)
}
func (h Handler) DeleteDivisi(c fiber.Ctx) error { return remove[model.Divisi](c, h.DB) }
