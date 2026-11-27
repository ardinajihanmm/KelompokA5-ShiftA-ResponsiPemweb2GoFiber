package model

type Divisi struct {
	ID         uint   `gorm:"primaryKey" json:"id"`
	NamaDivisi string `gorm:"not null" json:"nama_divisi"`
	Deskripsi  string `json:"deskripsi"`
}

func (Divisi) TableName() string { return "divisi" }
