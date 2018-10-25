import {
    User as DUser,
    Guild as DGuild,
    GuildMember as DGuildMember
} from "discord.js";
import { DBEntity } from "dd-botkit";
import {
    Entity,
    Column,
    OneToMany,
    ManyToMany,
    OneToOne,
    ManyToOne
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
        const dbUser: User | undefined = await User.findOne({
            id: guildMember.id
        });
        if (!member) {
            member = new GuildMember();
            member.id = guildMember.id;
            member.warnpoints = 0;
            member.xp = 0;
            member.muteDuration = 0;
            member.guild = guild;
            if (dbUser) {
                member.user = dbUser;
            }
        }

        return member.save();
    }

    @ManyToOne((type) => Guild, (guild) => guild.members, { eager: true })
    public guild: Guild;

    @OneToOne((type) => User, (user) => user)
    public user: User;

    @Column()
    public warnpoints: number;

    @Column()
    public xp: number;

    @Column()
    public muteDuration: number;
}
