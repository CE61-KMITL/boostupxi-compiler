import fs from "fs";
import path from "path";

export const addBanned = (sourceCode: string): string => {
  const bannedLibFilePath = path.join(__dirname, "../../data/libBanned.BAN");
  const bannedLibraries = fs
    .readFileSync(bannedLibFilePath, "utf-8")
    .split(/\r?\n/);

  for (const bannedLib of bannedLibraries) {
    if (sourceCode.includes(bannedLib)) {
      return `SORRY_${bannedLib}_IS_A_BANNED_LIBRARY`;
    }
  }

  if (sourceCode.includes("system")) {
    return "SORRY_SYSTEM_IS_A_BANNED_LIBRARY";
  }

  try {
    if (!sourceCode.includes("#include")) {
      return `#include "../../data/banned.h"\n${sourceCode}`;
    }

    const includeString = sourceCode.substring(
      sourceCode.lastIndexOf("#include")
    );
    const includeContent = includeString.substring(
      includeString.indexOf(">") + 1
    );

    const updatedSourceCode = `${sourceCode.substring(
      0,
      sourceCode.indexOf(includeContent)
    )}
\n#include "../../data/banned.h"\n${includeContent}`;

    return updatedSourceCode;
  } catch (error) {
    return `#include "../../data/banned.h"\n${sourceCode}`;
  }
};
