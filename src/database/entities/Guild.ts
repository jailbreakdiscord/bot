import { Guild as DGuild } from "discord.js";
import { Entity, Column } from "typeorm";
import { DBEntity } from "dd-botkit";

@Entity()
export class Guild extends DBEntity {

    /// The name of the guild
    @Column()
    public name: string;

    /**
     * Creates a database guild entity from a discord.js guild object.
     * @param discordGuild The discord.js guild object to represent in the database.
     */
    static async createGuild(discordGuild: DGuild): Promise<Guild> {
        const guild = new Guild();
        guild.id = discordGuild.id; // Reuse the discord snowflake
        guild.name = discordGuild.name;

        return await guild.save();
    }
}