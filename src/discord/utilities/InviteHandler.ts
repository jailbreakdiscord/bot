import { Guild, Client } from "discord.js";
import { Guild as DBGuild } from "../../database/entities/Guild";

export class InviteHandler {
    private _client: Client;
    public constructor(client: Client) {
        this._client = client;
    }

    public async addInvite(invite: string, guild: Guild) {
        const dbGuild = await DBGuild.findOne({
            where: { id: guild.id }
        });
        dbGuild!.allowedInvites.push(invite.toLowerCase());
        return dbGuild!.save();
    }

    public async removeInvite(invite: string, guild: Guild) {
        const dbGuild = await DBGuild.findOne({
            where: { id: guild.id }
        });
        // Remove invite from array.
        dbGuild!.allowedInvites.splice(
            dbGuild!.allowedInvites.indexOf(invite),
            1
        );
        return dbGuild!.save();
    }

    public async getInvites(guild: Guild) {
        const dbGuild = await DBGuild.findOne({
            where: { id: guild.id }
        });
        return dbGuild!.allowedInvites;
    }
}
