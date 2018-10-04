import { join } from "path";
import download from "image-downloader";
export class MemeManager {
    readonly MEME_PATH: string;
    constructor() {
        this.MEME_PATH = join(__dirname, "../../");
    }
    AddMeme(type: "image" | "text", url: string, name: string) {
        //prettier-ignore
        if (!url.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g))  {
            throw new TypeError("Expected URL as first parameter.");
        }
        download.image({
            url,
            dest: join(this.MEME_PATH, name)
        });
    }
}
