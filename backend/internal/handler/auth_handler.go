package handler

import (
	"errors"
	"eventdesk/internal/middleware"
	"eventdesk/internal/model"
	"eventdesk/internal/utils"
	"github.com/gofiber/fiber/v3"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"strconv"
	"strings"
	"time"
)

type registerInput struct {
	Nama     string `json:"nama" validate:"required,max=100"`
	Email    string `json:"email" validate:"required,email,max=200"`
	Password string `json:"password" validate:"required,min=8,max=72"`
}
type loginInput struct {
	Email    string `json:"email" validate:"required,email,max=200"`
	Password string `json:"password" validate:"required,max=72"`
}

func (h Handler) Register(c fiber.Ctx) error {
	var in registerInput
	if e := utils.Bind(c, &in); e != nil {
		return e
	}
	if e := nonblank(in.Nama); e != nil {
		return e
	}
	if len(in.Password) > 72 {
		return utils.Fail(c, 422, "Password maksimal 72 byte")
	}
	hash, e := bcrypt.GenerateFromPassword([]byte(in.Password), bcrypt.DefaultCost)
	if e != nil {
		return e
	}
	u := model.User{Nama: strings.TrimSpace(in.Nama), Email: strings.ToLower(in.Email), PasswordHash: string(hash), Role: "anggota"}
	if e = h.DB.Create(&u).Error; e != nil {
		return utils.DBError(c, e)
	}
	return utils.OK(c, 201, u)
}
func (h Handler) Login(c fiber.Ctx) error {
	var in loginInput
	if e := utils.Bind(c, &in); e != nil {
		return e
	}
	var u model.User
	e := h.DB.Where("email = ?", strings.ToLower(in.Email)).First(&u).Error
	if errors.Is(e, gorm.ErrRecordNotFound) {
		return utils.Fail(c, 401, "Email atau password salah")
	}
	if e != nil {
		return utils.DBError(c, e)
	}
	if bcrypt.CompareHashAndPassword([]byte(u.PasswordHash), []byte(in.Password)) != nil {
		return utils.Fail(c, 401, "Email atau password salah")
	}
	claims := middleware.Claims{Role: u.Role, RegisteredClaims: jwt.RegisteredClaims{Subject: strconv.FormatUint(uint64(u.ID), 10), IssuedAt: jwt.NewNumericDate(time.Now()), ExpiresAt: jwt.NewNumericDate(time.Now().Add(8 * time.Hour))}}
	token, e := jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString([]byte(h.Secret))
	if e != nil {
		return e
	}
	return utils.OK(c, 200, fiber.Map{"token": token, "user": u})
}
func (h Handler) Profile(c fiber.Ctx) error {
	var u model.User
	if e := h.DB.First(&u, middleware.UserID(c)).Error; e != nil {
		return utils.DBError(c, e)
	}
	return utils.OK(c, 200, u)
}
func (h Handler) Users(c fiber.Ctx) error {
	users := []model.User{}
	if e := h.DB.Order("id").Find(&users).Error; e != nil {
		return utils.DBError(c, e)
	}
	return utils.OK(c, 200, users)
}
