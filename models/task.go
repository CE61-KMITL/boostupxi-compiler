package models

import (
	"time"
)

type Task struct {
	ID           string     `json:"_id"`
	Title        string     `json:"title"`
	Description  string     `json:"description"`
	Author       Author     `json:"author"`
	Level        int        `json:"level"`
	Tags         []string   `json:"tags"`
	Hint         string     `json:"hint"`
	TestCases    []TestCase `json:"testcases"`
	Draft        bool       `json:"draft"`
	Status       string     `json:"status"`
	SolutionCode string     `json:"solution_code"`
	CreatedAt    time.Time  `json:"createdAt"`
	UpdatedAt    time.Time  `json:"updatedAt"`
}
