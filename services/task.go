package services

import (
	"boostupxi-compiler/config"
	"boostupxi-compiler/models"

	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gofiber/fiber/v2"
)

func GetTask(c *fiber.Ctx, questionID string) (*models.Task, error) {
	client := http.Client{}

	url := fmt.Sprintf("%s/tasks/%s", config.Config("API_URL"), questionID)

	request, err := http.NewRequest("GET", url, nil)

	if err != nil {
		return nil, err
	}

	request.Header.Set("Authorization", c.Get("Authorization"))

	response, err := client.Do(request)

	if err != nil {
		return nil, err
	}

	defer response.Body.Close()

	task := new(models.Task)
	if err := json.NewDecoder(response.Body).Decode(task); err != nil {
		return nil, err
	}

	return task, nil
}
