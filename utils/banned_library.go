package utils

import (
	"bufio"
	"errors"
	"os"
	"path/filepath"
	"strings"
)

func CheckBannedLibrary(sourceCode string) (string, error) {
	libBannedPath := filepath.Join("./constants", "libBanned.BAN")

	libBannedFile, err := os.Open(libBannedPath)

	if err != nil {
		return "", err
	}

	defer libBannedFile.Close()

	scanner := bufio.NewScanner(libBannedFile)

	for scanner.Scan() {
		line := scanner.Text()
		if strings.Contains(sourceCode, line) {
			return "", errors.New("BANNED_LIBRARY")
		}
	}

	if err := scanner.Err(); err != nil {
		return "", err
	}

	if strings.Contains(sourceCode, "#include") {
		lastIndex := strings.LastIndex(sourceCode, "#include")
		indexOfGreaterThan := strings.Index(sourceCode[lastIndex:], ">")

		sourceCode = sourceCode[:lastIndex+indexOfGreaterThan+1] + "\n#include \"../constants/banned.h\"" + sourceCode[lastIndex+indexOfGreaterThan+1:]

	} else {
		sourceCode = "#include \"../constants/banned.h\"\n" + sourceCode
	}

	return sourceCode, nil
}
