package services

import (
	"boostupxi-compiler/models"

	"os"
	"os/exec"
	"path/filepath"
)

func CheckResult(sourceCode string, testcases []models.TestCase) (string, error) {
	tempDir := "./temp"

	if err := os.MkdirAll(tempDir, 0755); err != nil {
		return "", err
	}

	sourceFilePath := filepath.Join(tempDir, "main.cpp")
	file, err := os.Create(sourceFilePath)

	if err != nil {
		return "", err
	}

	defer file.Close()

	if _, err := file.WriteString(sourceCode); err != nil {
		return "", err
	}

	exeFilePath := filepath.Join(tempDir, "main")
	cmd := exec.Command("g++", "-o", exeFilePath, sourceFilePath)

	if err := cmd.Run(); err != nil {
		return "", err
	}

	return "", nil
}
