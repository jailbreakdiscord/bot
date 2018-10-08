import { join } from "path";
import { download } from "./download-image";
import { exists, existsSync, mkdirSync, readdirSync } from "fs";

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
            const path = join(this.MEME_PATH, "/", `${name}${extension}`);
            if (!existsSync(this.MEME_PATH)) {
                mkdirSync(this.MEME_PATH);
            }
            if (existsSync(path)) {
                return reject(new Error("Meme already exists"));
            }
            download(url, path).then(() => {
                resolve(path);
            });
        });
    }

    public FetchImage(name: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const dirCont = readdirSync(this.MEME_PATH);
            const files = dirCont.filter((elm) => {
                return elm.match(new RegExp(`${name}.(.*)`));
            });
            if (!files) reject(new Error("Meme not found."));
            return resolve(join(this.MEME_PATH, files[0]));
        });
    }
}
