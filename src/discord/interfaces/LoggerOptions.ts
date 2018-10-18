import { GuildMember, User } from "discord.js";
// TODO: move to separate files
interface ISendOption {
    type: "ban" | "kick" | "warn" | "mute";
    reason: string;
    member: GuildMember;
    moderator: User;
}
/**
 * To be used for ban/kick/mute
 */
export interface ITemporaryLoggerOption extends ISendOption {
    duration: string;
}
/**
 * To be used for warn
 */
export interface IWarnLoggerOption extends ISendOption {
    points: number;
}
