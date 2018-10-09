import {
    Command,
    AccessLevel,
    CommandError,
    Logger,
    Guards,
    Constants
} from "dd-botkit";
import { RichEmbed } from "discord.js";
import { join, extname } from "path";
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
        const client = message.client;
        const type = _type;
        const name = _name;
        let url = _url;
        if (type !== "image" && type !== "text") {
            throw new CommandError({
                message: "Please choose a valid type. (image or text)"
            });
        }
        if (type === "image") {
            if (!url && !message.attachments.first()) {
                throw new CommandError({
                    message: "Please attach an image or specify a URL."
                });
            }
            let ext = "";
            if (!url) {
                url = message.attachments.first().url;
                ext = extname(message.attachments.first().filename);
            } else {
                ext = extname(url.substring(url.lastIndexOf("/") + 1));
            }
            const embed = new RichEmbed()
                .setAuthor(client.user.username, client.user.displayAvatarURL)
                .setFooter(Constants.BOT_AUTHOR)
                .setTimestamp()
                // Random hex color.
                .setColor(Math.floor(Math.random() * 16777215).toString(16))
                .setTitle("Add meme");

            MemeManager.AddImage(url, name, ext)
                .then((e) => {
                    embed.setDescription(`Successfully added meme: ${name}.`);
                }, async () => {
                    await message.channel.send(embed);
                })
                .catch((err) => {
                    if (err.name === "TypeError") {
                        return embed.setDescription(
                            "Please specify a valid URL."
                        );
                    }
                    embed.setDescription("Meme already exists.");
                })
        } else {
            // TODO: create AddText and manage the meme input if it is in fact text.
            // MemeManager.AddText;
        }
    }
};
