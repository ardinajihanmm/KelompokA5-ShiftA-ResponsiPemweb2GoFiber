package handler

import (
	"eventdesk/internal/model"
	"eventdesk/internal/utils"
	"github.com/gofiber/fiber/v3"
	"strconv"
	"strings"
)

type kegiatanInput struct {
	DivisiID     uint   `json:"divisi_id" validate:"required"`
	NamaKegiatan string `json:"nama_kegiatan" validate:"required,max=150"`
	Tanggal      string `json:"tanggal" validate:"required,datetime=2006-01-02"`
	Lokasi       string `json:"lokasi" validate:"required,max=150"`
	Deskripsi    string `json:"deskripsi" validate:"max=1000"`
	Status       string `json:"status" validate:"required,oneof=rencana berjalan selesai"`
}

func (h Handler) ListKegiatan(c fiber.Ctx) error {
	page, e := strconv.Atoi(c.Query("page", "1"))
	if e != nil || page < 1 || page > 1000000 {
		return utils.Fail(c, 422, "Page tidak valid")
	}
	limit, e := strconv.Atoi(c.Query("limit", "10"))
	if e != nil || limit < 1 || limit > 100 {
		return utils.Fail(c, 422, "Limit harus 1-100")
	}
	q := h.DB.Model(&model.Kegiatan{})
	search := strings.TrimSpace(c.Query("search"))
	if len(search) > 150 {
		return utils.Fail(c, 422, "Search terlalu panjang")
	}
	if search != "" {
		q = q.Where("LOWER(nama_kegiatan) LIKE LOWER(?)", "%"+search+"%")
	}
	if s := c.Query("status"); s != "" {
		if s != "rencana" && s != "berjalan" && s != "selesai" {
			return utils.Fail(c, 422, "Status tidak valid")
		}
		q = q.Where("status = ?", s)
	}
	if s := c.Query("divisi_id"); s != "" {
		id, err := strconv.ParseUint(s, 10, 64)
		if err != nil || id == 0 {
			return utils.Fail(c, 422, "Divisi tidak valid")
		}
		q = q.Where("divisi_id = ?", id)
	}
	var total int64
	if err := q.Count(&total).Error; err != nil {
		return utils.DBError(c, err)
	}
	rows := []model.Kegiatan{}
	if err := q.Preload("Divisi").Order("id desc").Offset((page - 1) * limit).Limit(limit).Find(&rows).Error; err != nil {
		return utils.DBError(c, err)
	}
	return utils.OK(c, 200, fiber.Map{"items": rows, "total": total, "page": page, "limit": limit})
}
func (h Handler) DetailKegiatan(c fiber.Ctx) error {
	id, e := idParam(c)
	if e != nil {
		return e
	}
	var m model.Kegiatan
	if e = h.DB.Preload("Divisi").First(&m, id).Error; e != nil {
		return utils.DBError(c, e)
	}
	return utils.OK(c, 200, m)
}
func (h Handler) saveKegiatan(c fiber.Ctx, update bool) error {
	var m model.Kegiatan
	if update {
		id, e := idParam(c)
		if e != nil {
			return e
		}
		if e = h.DB.First(&m, id).Error; e != nil {
			return utils.DBError(c, e)
		}
	}
	var in kegiatanInput
	if e := utils.Bind(c, &in); e != nil {
		return e
	}
	if e := nonblank(in.NamaKegiatan); e != nil {
		return e
	}
	if e := nonblank(in.Lokasi); e != nil {
		return e
	}
	if e := exists[model.Divisi](h.DB, in.DivisiID); e != nil {
		return e
	}
	m.DivisiID = in.DivisiID
	m.NamaKegiatan = strings.TrimSpace(in.NamaKegiatan)
	m.Tanggal = in.Tanggal
	m.Lokasi = strings.TrimSpace(in.Lokasi)
	m.Deskripsi = in.Deskripsi
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
	if e := h.DB.Preload("Divisi").First(&m, m.ID).Error; e != nil {
		return utils.DBError(c, e)
	}
	return utils.OK(c, code, m)
}
func (h Handler) CreateKegiatan(c fiber.Ctx) error { return h.saveKegiatan(c, false) }
func (h Handler) UpdateKegiatan(c fiber.Ctx) error { return h.saveKegiatan(c, true) }
func (h Handler) DeleteKegiatan(c fiber.Ctx) error { return remove[model.Kegiatan](c, h.DB) }
