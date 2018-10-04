import { Command, AccessLevel, Guards, Constants } from "dd-botkit";
import { RichEmbed } from "discord.js";
import { checkSpoopy } from "spoopylink";
export const UnshortenCommand: Command = {
    opts: {
        name: "unshorten",
        access: AccessLevel.EVERYONE,
        category: "Utilities",
        guards: [
            Guards.Argumented(
                "unshorten",
                "Unshorten a link, as well as find out if the link is safe or not.",
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
    handler: async (message, next) => {
        const [link] = msg.args;

        if(!link) {
          throw new CommandError({
              message: "Please specify a link."
          });
        }

        const spoop = await checkSpoopy(link)
        const embed = new RichEmbed()
        .setTitle(`${spoop.safe === false ? "Unsafe link detected" : "Safe link detected"}`);
        .setColor(`${spoop.safe ==== false ? 0xFF0000 : 0x00ee00}`);
        .addField(
          "URL + Redirect Safety",
          `${spoop.urlSafe = false ? 'This URL is not safe.' : 'This URL is deemed safe.'}\n${spoop.safe = false ? 'This URL and its redirects are not safe.' : 'This URL and its redirects are deemed safe.'}`,
          true
        );
        .addField(
          "Redirects",
          `${spoop.redirects[0] ? spoop.redirects[0] : 'This URL has no redirects.'}`,
          true
        );
        await message.channel.send(embed);
    }
};
