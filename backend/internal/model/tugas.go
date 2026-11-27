package model

type Tugas struct {
	ID         uint     `gorm:"primaryKey" json:"id"`
	KegiatanID uint     `gorm:"not null;index" json:"kegiatan_id"`
	Kegiatan   Kegiatan `gorm:"constraint:OnDelete:RESTRICT;" json:"kegiatan"`
	UserID     uint     `gorm:"not null;index" json:"user_id"`
	User       User     `gorm:"constraint:OnDelete:RESTRICT;" json:"user"`
	NamaTugas  string   `gorm:"not null" json:"nama_tugas"`
	Deskripsi  string   `json:"deskripsi"`
	Deadline   string   `json:"deadline"`
	Status     string   `json:"status"`
}

func (Tugas) TableName() string { return "tugas" }
