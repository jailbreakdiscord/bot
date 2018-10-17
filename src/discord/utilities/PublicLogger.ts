import { GuildMember, User } from "discord.js";

export class PublicLogger {
    private readonly _loggingChannel;
    constructor(channel: string) {
        this._loggingChannel = channel;
    }
    // TODO: write this method
    public send(options: ISendOption) {
        return;
    }
}
// TODO: move to separate files
interface ISendOption {
    type: "ban" | "kick" | "warn" | "mute";
    reason: string;
    member: GuildMember;
    moderator: User;
    options: ITemporaryLoggerOption | IWarnLoggerOption;
}
/**
 * To be used for ban/kick/mute
 */
interface ITemporaryLoggerOption extends ISendOption {
    duration: string;
}

/**
 * To be used for warn
 */
interface IWarnLoggerOption extends ISendOption {
    points: number;
}
