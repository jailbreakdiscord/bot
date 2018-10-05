import { Command, AccessLevel, Guards, CommandError } from "dd-botkit";
import { GuildMember } from "discord.js"

export const NickCommand: Command = {
    opts: {
        name: "nick",
        access: AccessLevel.MODERATOR,
        category: "Utilities",
        guards: [
            Guards.Argumented("nick", "Change a member's nickname", [
                {
                    name: "member",
                    type: "member",
                    required: true
                },
                {
                    name: "nickname",
                    type: "string",
                    required: false,
                    unlimited: true
                }
            ])
        ]
    },
    handler: async (message) => {
        const [member,nickname] : GuildMember | any = message.args
        try {
            await member.setNickname(nickname ? nickname : message.author.username,'Executed by ' + `${message.author.username}(${message.author.id})`)
            await message.success();
        }
        catch(err){
            await message.fail()
            throw new CommandError(err)
        }
  }
};
