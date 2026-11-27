package utils

import (
	"fmt"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v3"
	"strings"
)

var validate = validator.New()

func Bind(c fiber.Ctx, dst any) error {
	if err := c.Bind().Body(dst); err != nil {
		return fiber.NewError(422, "Format input tidak valid")
	}
	if err := validate.Struct(dst); err != nil {
		if ve, ok := err.(validator.ValidationErrors); ok {
			messages := []string{}
			for _, v := range ve {
				messages = append(messages, fmt.Sprintf("%s tidak valid (%s)", v.Field(), v.Tag()))
			}
			return fiber.NewError(422, strings.Join(messages, "; "))
		}
		return fiber.NewError(422, "Input tidak valid")
	}
	return nil
}
