import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const addBanned = (sourceCode: string): (number | string)[] => {
  const currentDirname = path.dirname(fileURLToPath(import.meta.url));
  const bannedLibFilePath = path.join(currentDirname, "../../data/libBanned.BAN");
  const bannedLibraries = fs
    .readFileSync(bannedLibFilePath, "utf-8")
    .split("\r\n");

  for (const bannedLib of bannedLibraries) {
    if (sourceCode.includes(bannedLib)) {
      return [-1, `SORRY_${bannedLib}_IS_A_BANNED_LIBRARY`];
    }
  }

  if (sourceCode.includes("system")) {
    return [-1, "SORRY_SYSTEM_IS_A_BANNED_LIBRARY"];
  }

  try {
    if (!sourceCode.includes("#include")) {
      return [1, `#include "../../data/banned.h"\r\n${sourceCode}`];
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
    \r\n#include "../../data/banned.h"\r\n${includeContent}`;

    return [1, updatedSourceCode];
  } catch (error) {
    return [1, `#include "../../data/banned.h"\r\n${sourceCode}`];
  }
};
