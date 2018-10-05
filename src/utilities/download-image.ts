import fs from "fs";
import snekfetch from "snekfetch";

export async function download(uri, filename) {
    return new Promise((resolve, reject) => {
        snekfetch
            .get(uri)
            .then((r) => {
                fs.writeFileSync(filename, r.body);
                resolve();
            })
            .catch((err) => reject(err));
    });
}
