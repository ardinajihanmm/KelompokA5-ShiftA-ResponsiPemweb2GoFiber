package model

type User struct {
	ID           uint   `gorm:"primaryKey" json:"id"`
	Nama         string `gorm:"not null" json:"nama"`
	Email        string `gorm:"size:200;uniqueIndex;not null" json:"email"`
	PasswordHash string `gorm:"not null" json:"-"`
	Role         string `gorm:"not null;default:anggota" json:"role"`
}
