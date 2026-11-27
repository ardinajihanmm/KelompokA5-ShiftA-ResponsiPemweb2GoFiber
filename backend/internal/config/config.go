package config

import (
	"fmt"
	"net"
	"os"
	"strings"
	"time"

	mysqlDriver "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

type Config struct{ Port, DatabaseDSN, JWTSecret, Origin, AdminEmail, AdminPassword string }

func envDefault(key, fallback string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return fallback
}

func Load() (Config, error) {
	_ = godotenv.Load()
	c := Config{
		Port:          envDefault("PORT", "3000"),
		JWTSecret:     os.Getenv("JWT_SECRET"),
		Origin:        envDefault("CORS_ORIGIN", "http://localhost:5173"),
		AdminEmail:    os.Getenv("ADMIN_EMAIL"),
		AdminPassword: os.Getenv("ADMIN_PASSWORD"),
	}
	if len(c.JWTSecret) < 32 || strings.HasPrefix(c.JWTSecret, "CHANGE_ME") {
		return c, fmt.Errorf("set a random JWT_SECRET of at least 32 characters")
	}
	c.DatabaseDSN = os.Getenv("DB_DSN")
	if c.DatabaseDSN == "" {
		db := mysqlDriver.NewConfig()
		db.User = envDefault("DB_USER", "root")
		db.Passwd = os.Getenv("DB_PASSWORD")
		db.Net = "tcp"
		db.Addr = net.JoinHostPort(envDefault("DB_HOST", "127.0.0.1"), envDefault("DB_PORT", "3306"))
		db.DBName = envDefault("DB_NAME", "eventdesk")
		db.ParseTime = true
		db.Loc = time.UTC
		db.Params = map[string]string{"charset": "utf8mb4"}
		c.DatabaseDSN = db.FormatDSN()
	}
	return c, nil
}
