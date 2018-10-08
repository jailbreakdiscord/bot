import {
    Command,
    AccessLevel,
    CommandError,
    Logger,
    Guards,
    Constants
} from "dd-botkit";
import { RichEmbed, Attachment } from "discord.js";
import { MemeManager } from "../../../";
export const KickCommand: Command = {
    opts: {
        name: "meme",
        access: AccessLevel.MODERATOR,
        category: "Fun",
        guards: [
            Guards.Argumented("meme", "Get meme.", [
                {
                    name: "name",
                    type: "string",
                    required: true
                }
            ])
        ]
    },
    handler: async (message, next) => {
        const [name]: any = message.args;
        let memePath;
        try {
            memePath = await MemeManager.FetchImage(name);
        } catch (error) {
            return message.reply("meme not found.");
        }
        message.channel.send({
            files: [new Attachment(memePath)]
        });
    }
};
