import { join } from "path";
import { download } from "./download-image";
import { existsSync, mkdirSync, readdirSync } from "fs";
import { Logger } from "dd-botkit";
import { safifyPath } from "./safeify-path";

export class MemeManager {
    private readonly MEME_PATH: string;
    constructor() {
        this.MEME_PATH = join(__dirname, "../../memes");
    }
    public async AddImage(
        url: string,
        name: string,
        extension: string
    ): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            // prettier-ignore
            if (!url.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) {
                return reject(new TypeError("Expected URL as first parameter."));
            }
            const path = join(
                this.MEME_PATH,
                "/",
                `${safifyPath(name + extension)}`
            );
            if (!existsSync(this.MEME_PATH)) {
                mkdirSync(this.MEME_PATH);
            }
            if (existsSync(path)) {
                return reject(new Error("Meme already exists"));
            }
            download(url, path)
                .then(() => {
                    resolve(path);
                })
                .catch(Logger.error);
        });
    }

    public FetchImage(name: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const dirCont = readdirSync(this.MEME_PATH);
            const files = dirCont.filter((elm) =>
                elm.match(new RegExp(`${name}.(.*)`))
            );
            if (!files) return reject(new Error("Meme not found."));
            return resolve(join(this.MEME_PATH, safifyPath(files[0])));
        });
    }
}
