package middleware

import (
	"eventdesk/internal/utils"
	"github.com/gofiber/fiber/v3"
	"github.com/golang-jwt/jwt/v5"
	"strconv"
	"strings"
)

type Claims struct {
	Role string `json:"role"`
	jwt.RegisteredClaims
}

func Auth(secret string) fiber.Handler {
	return func(c fiber.Ctx) error {
		parts := strings.Fields(c.Get("Authorization"))
		if len(parts) != 2 || !strings.EqualFold(parts[0], "Bearer") {
			return utils.Fail(c, 401, "Token diperlukan")
		}
		claims := &Claims{}
		token, err := jwt.ParseWithClaims(parts[1], claims, func(t *jwt.Token) (any, error) { return []byte(secret), nil }, jwt.WithValidMethods([]string{"HS256"}), jwt.WithExpirationRequired())
		if err != nil || !token.Valid {
			return utils.Fail(c, 401, "Token tidak valid atau kedaluwarsa")
		}
		id, e := strconv.ParseUint(claims.Subject, 10, 64)
		if e != nil || id == 0 {
			return utils.Fail(c, 401, "Token tidak valid")
		}
		c.Locals("user_id", uint(id))
		c.Locals("role", claims.Role)
		return c.Next()
	}
}
func UserID(c fiber.Ctx) uint  { id, _ := c.Locals("user_id").(uint); return id }
func IsAdmin(c fiber.Ctx) bool { return c.Locals("role") == "admin" }
