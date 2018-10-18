import { Channel, RichEmbed, Client, TextChannel } from "discord.js";
import {
    IWarnLoggerOption,
    ITemporaryLoggerOption
} from "../interfaces/LoggerOptions";

export class PublicLogger {
    public readonly _loggingChannel: TextChannel;
    private readonly _client: Client;
    constructor(client: Client, channel: TextChannel) {
        this._loggingChannel = channel;
        this._client = client;
    }
    // TODO: write this method
    public async send(options: IWarnLoggerOption | ITemporaryLoggerOption) {
        const embed = new RichEmbed()
            .setAuthor(
                this._client.user.username,
                this._client.user.displayAvatarURL
            )
            // TODO: this is supposed to be the actual case number.
            .setFooter("placeholder case")
            .setTimestamp()
            .addField(
                "Member",
                `${options.member.user.tag} (${options.member.user.id})`
            )
            .addField("Reason", options.reason);
        try {
            switch (options.type) {
                case "ban": {
                    embed
                        .setTitle("Member Banned")
                        .setColor("BLUE")
                        .addField(
                            "Duration",
                            (options as ITemporaryLoggerOption).duration
                        );
                    break;
                }
                case "kick": {
                    embed
                        .setTitle("Member Kicked")
                        .setColor("GREEN")
                        .addField(
                            "Duration",
                            (options as ITemporaryLoggerOption).duration
                        );
                    break;
                }
                case "warn": {
                    embed
                        .setTitle("Member Warned")
                        .setColor("ORANGE")
                        .addField(
                            "Points",
                            (options as IWarnLoggerOption).points
                        );
                    break;
                }
                case "mute": {
                    embed
                        .setTitle("Member Muted")
                        .setColor("PINK")
                        .addField(
                            "Duration",
                            (options as ITemporaryLoggerOption).duration
                        );
                    break;
                }

                default: {
                    break;
                }
            }
        } finally {
            await this._loggingChannel.send(embed);
        }
    }
}
