package utils

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

func CheckFromPath(folderPath string, sourceCode string) (string, error) {

	folder, err := os.Open(folderPath)
	if err != nil {
		return "", fmt.Errorf("error opening folder '%s'", folderPath)
	}
	defer folder.Close()

	files, err := folder.Readdir(-1)
	if err != nil {
		return "", fmt.Errorf("error reading folder '%s': %w", folderPath, err)
	}

	for _, file := range files {

		if file.IsDir() {
			continue
		}

		filePath := filepath.Join(folderPath, file.Name())
		file, err := os.Open(filePath)
		if err != nil {
			return "", fmt.Errorf("error opening file '%s': %w", file.Name(), err)
		}
		defer file.Close()

		scanner := bufio.NewScanner(file)
		for scanner.Scan() {
			if strings.Contains(sourceCode, scanner.Text()) {
				return scanner.Text(), nil
			}
		}
		if err := scanner.Err(); err != nil {
			
			return "", fmt.Errorf("error reading file '%s': %w", file.Name(), err)
		}
	}
	return "", nil
}

func CheckBannedLibrary(sourceCode string) string {

	CheckFromPath("./constants/", sourceCode)

	return sourceCode
}
