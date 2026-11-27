package middleware

import (
	"github.com/gofiber/fiber/v3"
	"github.com/golang-jwt/jwt/v5"
	"net/http/httptest"
	"testing"
	"time"
)

func TestAuthAndAdmin(t *testing.T) {
	const secret = "test-secret-not-for-production-1234567890"
	app := fiber.New()
	app.Get("/admin", Auth(secret), Admin, func(c fiber.Ctx) error { return c.SendStatus(200) })
	makeToken := func(role string, expiry time.Time) string {
		claims := Claims{Role: role, RegisteredClaims: jwt.RegisteredClaims{Subject: "1", ExpiresAt: jwt.NewNumericDate(expiry)}}
		token, err := jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString([]byte(secret))
		if err != nil {
			t.Fatal(err)
		}
		return token
	}
	cases := []struct {
		name, token string
		code        int
	}{
		{"no token", "", 401}, {"bad token", "bad", 401}, {"member", makeToken("anggota", time.Now().Add(time.Hour)), 403}, {"admin", makeToken("admin", time.Now().Add(time.Hour)), 200}, {"expired", makeToken("admin", time.Now().Add(-time.Hour)), 401},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			req := httptest.NewRequest("GET", "/admin", nil)
			if tc.token != "" {
				req.Header.Set("Authorization", "Bearer "+tc.token)
			}
			res, err := app.Test(req)
			if err != nil {
				t.Fatal(err)
			}
			defer res.Body.Close()
			if res.StatusCode != tc.code {
				t.Fatalf("got %d want %d", res.StatusCode, tc.code)
			}
		})
	}
}
