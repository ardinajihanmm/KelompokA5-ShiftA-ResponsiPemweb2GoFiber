package config

import (
	"eventdesk/internal/model"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

// Tahap fondasi: tabel lain dan seeder admin diaktifkan pada integrasi akhir.
func Open(c Config) (*gorm.DB, error) {
	db, err := gorm.Open(mysql.Open(c.DatabaseDSN), &gorm.Config{TranslateError: true})
	if err != nil {
		return nil, err
	}
	if err = db.Set("gorm:table_options", "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci").AutoMigrate(&model.Divisi{}); err != nil {
		return nil, err
	}
	return db, nil
}
