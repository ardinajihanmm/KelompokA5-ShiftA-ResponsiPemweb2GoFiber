package model

type Kegiatan struct {
	ID           uint   `gorm:"primaryKey" json:"id"`
	DivisiID     uint   `gorm:"not null;index" json:"divisi_id"`
	Divisi       Divisi `gorm:"constraint:OnDelete:RESTRICT;" json:"divisi"`
	NamaKegiatan string `gorm:"not null" json:"nama_kegiatan"`
	Tanggal      string `json:"tanggal"`
	Lokasi       string `json:"lokasi"`
	Deskripsi    string `json:"deskripsi"`
	Status       string `json:"status"`
}

func (Kegiatan) TableName() string { return "kegiatan" }
