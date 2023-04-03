package services

import (
	"os"
	"path/filepath"
)

func CreateFile(sourceCode string) (string, error) {
	// TODO: create temp directory if not exists
	if err := os.MkdirAll("./temp", 0755); err != nil {
		return "", err
	}

	// TODO: convert source code to file
	sourceFile := filepath.Join("./temp", "main.cpp")
	file, err := os.Create(sourceFile)

	if err != nil {
		return "", err
	}

	_, err = file.WriteString(sourceCode)

	if err != nil {
		return "", err
	}

	err = file.Close()

	if err != nil {
		return "", err
	}

	return sourceFile, nil
}
