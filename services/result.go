package services

import (
	"boostupxi-compiler/models"

	"os"
	"os/exec"
	"path/filepath"
)

func CheckResult(sourceCode string, testcases []models.TestCase) (string, error) {
	if err := os.MkdirAll("./temp", 0755); err != nil {
		return "", err
	}

	sourceFilePath := filepath.Join("./temp", "main.cpp")
	file, err := os.Create(sourceFilePath)

	if err != nil {
		return "", err
	}

	defer file.Close()

	if _, err := file.WriteString(sourceCode); err != nil {
		return "", err
	}

	exeFilePath := filepath.Join("./temp", "main")
	cmd := exec.Command("g++", "-o", exeFilePath, sourceFilePath)

	if err := cmd.Run(); err != nil {
		return "", err
	}

	return "", nil
}
