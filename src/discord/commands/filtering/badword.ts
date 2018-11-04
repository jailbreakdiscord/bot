import { Command, AccessLevel, Guards, Constants } from "dd-botkit";
import { RichEmbed } from "discord.js";
import { getBadWordHandler, getInviteHandler } from "../..";
export const BanCommand: Command = {
    opts: {
        name: "badword",
        aliases: ["bw"],
        access: AccessLevel.MODERATOR,
        category: "Filtering",
        guards: [
            Guards.Argumented("badword", "Add or remove a bad word.", [
                {
                    name: "action",
                    type: "string",
                    required: true
                },
                {
                    name: "word",
                    type: "string",
                    required: false,
                    unlimited: true
                }
            ])
        ]
    },
    handler: async (message, next) => {
        const [action, invite]: string | any = message.args;
        if (action !== "add" && action !== "remove" && action !== "list") {
            return message.fail();
        }
        if (action === "add") {
            await getInviteHandler().addInvite(invite, message.guild);
        } else if (action === "remove") {
            await getInviteHandler().removeInvite(invite, message.guild);
        } else {
            const invites = await getInviteHandler().getInvites(message.guild);
            const embed = new RichEmbed()
                .setAuthor(
                    message.client.user.username,
                    message.client.user.displayAvatarURL
                )
                .setFooter(Constants.BOT_AUTHOR)
                .setTimestamp()
                .setColor("RANDOM")
                .setTitle("Allowed invites")
                .setDescription("All allowed invites on this server.")
                // u200b is a ZWS
                .addField("\u200b", invites.map((x) => `‣ ${x}`));
            await message.channel.send(embed);
        }
        await message.success();
    }
};
