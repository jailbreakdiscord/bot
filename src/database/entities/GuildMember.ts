import {
    User as DUser,
    Guild as DGuild,
    GuildMember as DGuildMember
} from "discord.js";
import { DBEntity } from "dd-botkit";
import {
    Entity,
    Column,
    JoinColumn,
    OneToMany,
    ManyToMany,
    OneToOne,
    ManyToOne,
    Index
} from "typeorm";
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
        guildMember: DGuildMember,
        guild: Guild
    ): Promise<GuildMember> {
        let member = await GuildMember.findOne({ id: guildMember.id });
        const user = await User.createOrUpdate(guildMember.user);

        if (!member) {
            member = new GuildMember();
            member.id = guildMember.id;
            member.warnpoints = 0;
            member.xp = 0;
            member.unmuteAt = 0;
            member.guild = guild;
            member.user = user;
            member.guildID = guild.id;
        }

        return member.save();
    }

    @ManyToOne((type) => Guild, (guild) => guild.members, { lazy: true })
    public guild: Promise<Guild> | Guild;

    @OneToOne((type) => User, (user) => user, { lazy: true })
    @JoinColumn()
    public user: Promise<User> | User;

    @Column()
    public warnpoints: number;

    @Column()
    public guildID: string;

    @Column()
    public xp: number;

    @Column()
    public unmuteAt: number;
}
