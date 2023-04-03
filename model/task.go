package model

import "time"

type Task struct {
	ID          string `json:"_id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Author      struct {
		Username string `json:"username"`
		AuthorID string `json:"id"`
	}
	Level     int      `json:"level"`
	Tags      []string `json:"tags"`
	Hint      string   `json:"hint"`
	TestCases []struct {
		Input     string `json:"input"`
		Output    string `json:"output"`
		Published bool   `json:"published"`
	} `json:"testcases"`
	Draft        bool      `json:"draft"`
	Status       string    `json:"status"`
	SolutionCode string    `json:"solution_code"`
	CreatedAt    time.Time `json:"createdAt"`
	UpdatedAt    time.Time `json:"updatedAt"`
}
