import { oneLine } from "common-tags";
import { Command } from "dd-botkit";
import { GuildMember, User } from "discord.js";

export const AdvancedDevCommand: Command = {
    opts: {
        name: "advdev",
        category: "Utilities",
        usage: {
            description: "Decline or accept a user to advanced deloper.",
            args: [
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
        },
        node: "jbdiscord.advanced-dev"
    },
    handler: async (msg, next) => {
        if (
            msg.guild.id === "349243932447604736" ||
            msg.guild.id === "493378389802090498"
        ) {
            return msg.fail();
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
            // prettier-ignore
            await user.send(oneLine`Hi ${user.username}}\nThank you for applying to the Advanced Developer role; we appreciate your work and enthusiasm.
                We are incredibly happy to inform you that your application has been approved 🎉.
                As you may know, this gives you access to #developer-backroom.\n
                This channel is locked to the public, and nothing is to be leaked, without a developer's or and administrator's permission.
                If you are caught sharing secret information, we will make the necessary decisions about your punishment.
                Best regards,
                the /r/jailbreak Discord staff`);
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
        the /r/jailbreak Discord staff`);
    }
};
