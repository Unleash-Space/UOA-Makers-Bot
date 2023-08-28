import { join } from "path";
import { readdirSync } from "fs";

/**
 * Imports all default exports from a directory, excluding index.js.
 * @param dirNames The path to the directory, relative to the project root.
 * @param validate A function that validates the default export of each file.
 * @returns An array of default exports.
 */
export const importDefaultExportsInDir = <T>(
  dirNames: string[],
  validate: (defaultExport: any) => defaultExport is T
) => {
  const dir = join(__dirname, "../", ...dirNames);

  return (
    // Get all files in the directory
    readdirSync(dir)
      .filter((file) => file !== "index.js" && file.endsWith(".js"))
      // Return the default export of each file
      .map((file) => {
        const filePath = join(dir, file);
        const defaultExport = require(filePath).default;
        if (validate(defaultExport)) return defaultExport;

        throw Error(
          `The file at ${filePath} does not have a valid default export.`
        );
      })
  );
};

/**
 * Converts a date to a YYYY-MM-DD string.
 * @param date The date to convert.
 * @returns A YYYY-MM-DD string.
 */
export const toYYYYMMDD = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};
