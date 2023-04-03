package services

import (
	"boostupxi-compiler/models"
)

func CheckResult(sourceCode string, testcases []models.TestCase) (string, error) {
	_, err := CreateFile(sourceCode)

	if err != nil {
		return "", err
	}

	// TODO: return result
	return "", nil
}
