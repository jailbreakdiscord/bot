import { normalize } from "path";
/**
 * @description Make a path safe from injections.
 * @param path Path to be made safe.
 * @returns A safe path.
 */
export function safifyPath(path: string) {
    return normalize(path).replace(/^(\.\.[\/\\])+/, "");
}
