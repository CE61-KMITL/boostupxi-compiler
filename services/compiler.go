package services

import (
	"boostupxi-compiler/utils"
)

func Create(sourceCode, fileName string) {
	sourceCode, _ = utils.CheckBannedLibrary(utils.CommentStripped(sourceCode))
	
}

func Build(filePath string) {

}
