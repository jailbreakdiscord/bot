import { Command, AccessLevel, CommandError, Logger, Guards } from "dd-botkit";
import { join } from "path";
import fs from "fs";
import { MemeManager } from "../../../";
const MEME_PATH = join(__dirname, "../../../../memes");
export const KickCommand: Command = {
    opts: {
        name: "addmeme",
        access: AccessLevel.MODERATOR,
        category: "Fun",
        guards: [
            Guards.Argumented("addmeme", "Manage memes", [
                {
                    name: "type",
                    type: "string",
                    required: true
                },
                {
                    name: "name",
                    type: "string",
                    required: true
                },
                {
                    name: "url",
                    type: "string",
                    required: false,
                    unlimited: false
                }
            ])
        ]
    },
    handler: async (message, next) => {
        const [_type, _name, _url]: any = message.args;
        let type = _type,
            name = _name,
            url = _url;
        if (type !== "image" || type !== "text") {
            throw new CommandError({
                message: "Please choose a valid type. (image or text)"
            });
        }
        switch (type) {
            case "image": {
                break;
            }
            case "text": {
                break;
            }

            default: {
                break;
            }
        }
        MemeManager.AddMeme(type, url, name);
        console.log(MEME_PATH);
    }
};
