package models

type TestCase struct {
	Input     string `json:"input"`
	Output    string `json:"output"`
	Published bool   `json:"published"`
}
