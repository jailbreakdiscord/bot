import { Command, AccessLevel, Guards, CommandError } from "dd-botkit";
import { GuildChannel } from "discord.js"
export const MuteChannelCommand: Command = {
    opts: {
        name: "unmutechannel",
        access: AccessLevel.ADMIN,
        category: "Utilities",
        guards: [
            Guards.Argumented("unmutechannel", "Grants SEND_MESSAGES and ADD_REACTIONS permissions to @everyone.", [
                {
                    name: "channel",
                    type: "channel",
                    required: false
                }
            ])
        ]
    },
    handler: async (message) => {
    const [channel] :  any | GuildChannel = message.args
    try {
   await mutechannel(channel ? channel : message.channel)
    }
    catch(err){
        throw new CommandError(err)
    }

  }
};

async function mutechannel(channel){
    await channel.overwritePermissions(channel.guild.defaultRole,{
        'SEND_MESSAGES': true,
       'ADD_REACTIONS': true
       })
}
