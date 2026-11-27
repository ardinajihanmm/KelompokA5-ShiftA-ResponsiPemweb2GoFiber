package config

import (
	"errors"
	"eventdesk/internal/model"
	"fmt"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"strings"
)

func Open(c Config) (*gorm.DB, error) {
	db, err := gorm.Open(mysql.Open(c.DatabaseDSN), &gorm.Config{TranslateError: true})
	if err != nil {
		return nil, err
	}
	if err = db.Set("gorm:table_options", "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci").AutoMigrate(&model.User{}, &model.Divisi{}, &model.Kegiatan{}, &model.Tugas{}); err != nil {
		return nil, err
	}
	if c.AdminEmail != "" && c.AdminPassword != "" {
		if len(c.AdminPassword) < 8 || strings.HasPrefix(c.AdminPassword, "CHANGE_ME") {
			return nil, fmt.Errorf("set a real ADMIN_PASSWORD (min 8 characters)")
		}
		email := strings.ToLower(strings.TrimSpace(c.AdminEmail))
		var u model.User
		err = db.Where("email = ?", email).First(&u).Error
		if errors.Is(err, gorm.ErrRecordNotFound) {
			hash, e := bcrypt.GenerateFromPassword([]byte(c.AdminPassword), bcrypt.DefaultCost)
			if e != nil {
				return nil, e
			}
			if e = db.Create(&model.User{Nama: "Admin EventDesk", Email: email, PasswordHash: string(hash), Role: "admin"}).Error; e != nil {
				return nil, e
			}
		} else if err != nil {
			return nil, err
		} else if u.Role != "admin" {
			return nil, fmt.Errorf("ADMIN_EMAIL is already registered as an ordinary member")
		}
	}
	return db, nil
}
