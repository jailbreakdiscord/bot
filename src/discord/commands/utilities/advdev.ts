import { Command, AccessLevel, CommandError, Logger, Guards } from "dd-botkit";
import { User, GuildMember } from "discord.js";
import { oneLine } from "common-tags";
export const KickCommand: Command = {
    opts: {
        name: "advdev",
        access: AccessLevel.ADMIN,
        category: "Utilities",
        guards: [
            Guards.Argumented(
                "advdev",
                "Decline or accept a user to advanced developer.",
                [
                    {
                        name: "Decline or accept",
                        type: "boolean",
                        required: true
                    },
                    {
                        name: "user",
                        type: "user",
                        required: true,
                        unlimited: true
                    }
                ]
            )
        ]
    },
    handler: async (msg, next) => {
        if (
            msg.guild.id == "349243932447604736" ||
            msg.guild.id == "493378389802090498"
        ) {
            return await msg.fail();
        }
        // decision == false - decline
        // decision == true - accept
        const [decision, _user]: any | User = msg.args;
        const user: User = _user;
        const member: GuildMember | undefined = msg.guild.members.get(user.id);
        if (!member) {
            return;
        }
        if (decision) {
            // accept user
            await user.send(
                oneLine`Hi ${
                    user.username
                }}\nThank you for applying to the Advanced Developer role; we appreciate your work and enthusiasm.
                We are incredibly happy to inform you that your application has been approved 🎉.
                As you may know, this gives you access to #developer-backroom.\n
                This channel is locked to the public, and nothing is to be leaked, without a developer's or and administrators permission.
                If you are caught sharing secret information, we will make the necessary decisions about your punishment.`
            );
            await member.addRole("Advanced Developers");
            return msg.success();
        }
        // reject user
        // prettier-ignore
        await user.send(oneLine`Hi ${user.username}\nThank you for applying for
        the Advanced Developer role; we appreciate your work and enthusiasm.
        We regret to inform you that your application for Advanced Developer was not accepted at this time, as unfortunately, 
        we are not able to accept every application. 
        We loved reading over your application, and encourage you to re-apply when you feel that you meet the criteria; 
        you're more than welcome to do this in a months time. We look forward to see you in #development, and you'll still retain your Developer role. 

        Best regards, 
        the /r/jailbreak discord staff`);
    }
};
