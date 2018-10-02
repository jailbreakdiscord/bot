import { Command, AccessLevel, Guards } from "dd-botkit";
import { GuildChannel } from "discord.js"
export const MuteChannelCommand: Command = {
    opts: {
        name: "mutechannel",
        access: AccessLevel.ADMIN,
        category: "Utilities",
        guards: [
            Guards.Argumented("mutechannel", "Revokes SEND_MESSAGES permissions from @everyone.", [
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
    mutechannel(channel ? channel : message.channel)
  }
};

function mutechannel(channel){
    channel.overwritePermissions(channel.guild.defaultRole,{
        'SEND_MESSAGES': false,
       'ADD_REACTIONS': false
       }).catch(console.error);
}
