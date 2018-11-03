import { Command, AccessLevel, Guards, Constants } from "dd-botkit";
import { RichEmbed } from "discord.js";
import { uu } from "unshorten-url";
export const UnshortenCommand: Command = {
    opts: {
        name: "unshorten",
        access: AccessLevel.EVERYONE,
        category: "Utilities",
        guards: [
            Guards.Argumented(
                "unshorten",
                "Unshorten a link.",
                [
                    {
                        name: "link",
                        type: "string",
                        required: true
                    }
                ]
            )
        ]
    },
    handler: async (msg, next) => {
        const [link] = msg.args;

        if(!link) {
          throw new CommandError({
              message: "Please specify a link."
          });
        }
        const url = await uu.expand(link)
        const embed = new RichEmbed();
        embed.setDescription(`${url}`)
        await msg.reply(embed);
    }
};
