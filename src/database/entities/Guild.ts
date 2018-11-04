import { Guild as DGuild } from "discord.js";
import {
    Entity,
    Column,
    OneToMany,
    OneToOne,
    ManyToMany,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { DBEntity } from "dd-botkit";
import { Message } from "./Message";
import { User } from "./User";
import { GuildMember } from "./GuildMember";

/*
  TODO: 
  * Add a GuildConfiguration model
  * Add more fields to `Guild` as needed
*/
@Entity()
export class Guild extends DBEntity {
    /**
     * Creates or updates a Discord Guild object.
     * @param discordGuild The discord.js guild object to represent in the database.
     */
    public static async createOrUpdate(discordGuild: DGuild): Promise<Guild> {
        let guild = await Guild.findOne({ id: discordGuild.id });

        if (!guild) {
            guild = new Guild();
            guild.id = discordGuild.id;
            guild.badWords = [];
        }

        guild.name = discordGuild.name;
        guild.owner = await User.createOrUpdate(discordGuild.owner.user);
        return guild.save();
    }
    /// The name of the guild
    @Column()
    public name: string;

    @OneToOne((type) => User, (user) => user, { lazy: true })
    @JoinColumn()
    public owner: Promise<User> | User;

    @OneToMany((type) => Message, (message) => message.guild)
    public messages: Promise<Message[]>;

    @ManyToMany((type) => User, (user) => user.guilds, { lazy: true })
    public users: Promise<User[]> | User[];

    @OneToMany((type) => GuildMember, (member) => member.guild, { lazy: true })
    public members: Promise<GuildMember[]> | GuildMember[];

    @Column("simple-array")
    public badWords: string[];

    @Column("simple-array")
    public invites: string[];
}
