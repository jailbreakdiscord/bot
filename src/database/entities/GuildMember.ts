import {
    User as DUser,
    Guild as DGuild,
    GuildMember as DGuildMember
} from "discord.js";
import { DBEntity } from "dd-botkit";
import { Entity, Column, OneToMany, ManyToMany, OneToOne } from "typeorm";
import { Message } from "./Message";
import { Guild } from "./Guild";
import { User } from "./User";

@Entity()
export class GuildMember extends DBEntity {
    /**
     * Creates or updates a Discord User object.
     * @param guildMember The discord.js guild object to represent in the database.
     */
    public static async createOrUpdate(
        guildMember: DGuildMember
    ): Promise<GuildMember> {
        let member = await GuildMember.findOne({ id: guildMember.id });

        if (!member) {
            member = new GuildMember();
            member.id = guildMember.id;
        }

        /* I'm not sure how to handle relational properties here. */

        return member.save();
    }

    @OneToOne((type) => Guild, (guild) => guild)
    public guild: DGuild;

    @OneToOne((type) => User, (user) => user)
    public user: User;

    @Column()
    public warnpoints: number;

    @Column()
    public xp: number;
}
