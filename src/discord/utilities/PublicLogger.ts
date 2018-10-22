import { GuildChannel, RichEmbed, Client, TextChannel } from "discord.js";
import {
    IWarnLoggerOption,
    ITemporaryLoggerOption
} from "../interfaces/LoggerOptions";
import { PublicLogsCase } from "../../database/entities/PublicLogsCase";

export class PublicLogger {
    public readonly _loggingChannel: TextChannel;
    private readonly _client: Client;
    constructor(client: Client, channel: string) {
        this._client = client;
        this._loggingChannel = this._client.channels.get(
            channel
        )! as TextChannel;
    }

    public async send(options: IWarnLoggerOption | ITemporaryLoggerOption) {
        const dbCase = new PublicLogsCase();
        dbCase.reason = options.reason;
        const embed = new RichEmbed()
            .setAuthor(
                this._client.user.username,
                this._client.user.displayAvatarURL
            )
            // TODO: this is supposed to be the actual case number.
            .setFooter(dbCase.case)
            .setTimestamp()
            .addField(
                "Member",
                `${options.member.user.tag} (${options.member.user.id})`
            )
            .addField("Reason", options.reason);
        try {
            // Since dbCase.type will vary, I prefer to assign it all in one place, rather than simply doing `dbCase.type = options.type` further up.
            switch (options.type) {
                case "ban": {
                    dbCase.type = "ban";
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
                    dbCase.type = "kick";
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
                    dbCase.type = "warn";
                    dbCase.points = (options as IWarnLoggerOption).points;
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
                    dbCase.type = "mute";
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
            // prettier-ignore
            await dbCase.save();
            await this._loggingChannel.send(embed);
        }
    }
}
