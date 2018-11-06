import { Message } from "../../../database/entities";
import { GuildMember } from "../../../database/entities/GuildMember";
// TODO: develop this further.
export async function generateXP(dbMember: GuildMember): Promise<number> {
    // Fetch messages from author in specific guild.
    const dbMessages = await Message.find({
        where: {
            author: dbMember,
            guild: await dbMember.guild
        }
    });
    return Math.round(
        (Math.floor(Math.random() * 20) + 1) *
            Math.sqrt(dbMessages.length / 100)
    );
}
