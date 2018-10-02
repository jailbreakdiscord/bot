import { Command, AccessLevel, Guards, CommandError } from "dd-botkit";
import { GuildChannel, Role, RichEmbed } from "discord.js"
export const MentionCommand: Command = {
    opts: {
        name: "mention",
        access: AccessLevel.ADMIN,
        category: "Utilities",
        guards: [
            Guards.Argumented("ping", "Pings given role", [
                {
                    name: "channel",
                    type: "channel",
                    required: true
                },
                {
                    name: "text",
                    type: "string",
                    required: true
                }                
            ])
        ]
    },
    handler: async (message) => {
   const [channel,text] : GuildChannel | any = message.args
   const guild_roles = message.guild.roles.array()
   
   const embed = new RichEmbed()
   .setTitle("Hello, choose the number of the desired role.")
   .setColor(0xEE82EE)
   for (var x =0;x<guild_roles.length;x++){
       embed.addField(x + '.',`${guild_roles[x].name} (${guild_roles[x].id})`)
   }
   await message.channel.send({embed})
   const filter = msg => msg.author.id === message.author.id
   message.channel.awaitMessages(filter,{ max: 1, time: 20000, errors: ['time'] }).then(async collected=>{
   const msg = collected.first();
   if (msg.content.includes("+")){
       const indexes_of_roles_to_ping = msg.content.replace(/\s/g,"").split("+")
       var roles_to_ping : any = []
       for (var x =0;x<indexes_of_roles_to_ping.length;x++){
           if (!guild_roles[indexes_of_roles_to_ping[x]]) throw new CommandError({message:'Unknown role index'})
           else roles_to_ping.push(guild_roles[indexes_of_roles_to_ping[x]])
       } 
    }
    else {
        var roles_to_ping : any | Role = [guild_roles[parseInt(msg.content)]];
    }
    try{
  await setMentionable(roles_to_ping,1)
  await channel.send(`${roles_to_ping}: ${text}`)
  await setMentionable(roles_to_ping,0)
    }
    catch(err){
        throw new CommandError(err)
    }
   })
  }
};

async function setMentionable(roles,boolean){
for (var e =0;e<roles.length;e++){
    if (boolean) await roles[e].setMentionable(true)
    else await roles[e].setMentionable(false)
}
}
