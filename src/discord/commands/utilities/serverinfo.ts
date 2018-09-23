import {
    Command,
    AccessLevel,
    CommandError,
    Logger,
    Guards,
    Constants
} from 'dd-botkit';
import { RichEmbed } from 'discord.js';
export const ServerInfoCommand: Command = {
    opts: {
        name: 'serverinfo',
        access: AccessLevel.EVERYONE,
        category: 'Utilities',
        guards: [Guards.Argumented('serverinfo', 'Kicks a user', [])]
    },
    handler: async (message, next) => {
        const guild = message.guild;
        const client = message.client;
        const embed = new RichEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL)
            .setFooter(Constants.BOT_AUTHOR)
            .setTimestamp()
            .setTitle('Server Info')
            .setDescription('General information about the server.')
            .addField('Name', guild.name, true)
            .addField(
                'Creation Date',
                new Date(guild.createdTimestamp).toUTCString(),
                true
            )
            .addBlankField()
            .addField('Region', guild.region, true)
            .addField('Verification level', guild.verificationLevel, true)
            .addBlankField()
            .addField('Channels', guild.channels.size, true)
            .addField('Roles', guild.roles.size, true)
            .addBlankField()
            .addField('Owner', guild.owner.user.tag, true)
            .addField('Members', guild.memberCount, true);
        message.channel.send(embed);
    }
};
