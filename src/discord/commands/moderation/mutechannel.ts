import { Command, AccessLevel, Guards, CommandError } from "dd-botkit";
import { GuildChannel } from "discord.js"
export const MuteChannelCommand: Command = {
    opts: {
        name: "mutechannel",
        access: AccessLevel.ADMIN,
        category: "Utilities",
        guards: [
            Guards.Argumented("mutechannel", "Revokes SEND_MESSAGES and ADD_REACTIONS permissions from @everyone.", [
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
        'SEND_MESSAGES': false,
       'ADD_REACTIONS': false
       })
}
