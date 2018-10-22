import { GuildMember, User } from "discord.js";
export interface ILoggerOption {
    type: "ban" | "kick" | "warn" | "mute";
    reason: string;
    member: GuildMember;
    moderator: User;
}
/**
 * To be used for ban/kick/mute
 */
export interface ITemporaryLoggerOption extends ILoggerOption {
    duration: string;
}
/**
 * To be used for warn
 */
export interface IWarnLoggerOption extends ILoggerOption {
    points: number;
}
