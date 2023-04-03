package services

import (
	"boostupxi-compiler/models"
)

func CheckResult(sourceCode string, testcases []models.TestCase) (string, error) {
	_, err := CreateFile(sourceCode)

	if err != nil {
		return "", err
	}

	// TODO: compile file

	// TODO: run file with test cases

	// TODO: compare result with test cases

	// TODO: delete file

	// TODO: return result

	return "", nil
}
