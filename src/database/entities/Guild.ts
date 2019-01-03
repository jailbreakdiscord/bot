import { DBEntity } from "dd-botkit";
import { Guild as DGuild } from "discord.js";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { GuildMember } from "./GuildMember";
import { Message } from "./Message";
import { User } from "./User";

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
        }

        guild.name = discordGuild.name;
        guild.owner = await User.createOrUpdate(discordGuild.owner.user);
        return guild.save();
    }

    @Column()
    public name: string;

    @ManyToOne(type => User, user => user.ownedGuilds)
    @JoinColumn()
    public owner: User;

    @OneToMany(type => Message, message => message.guild)
    public messages: Promise<Message[]> | Message[];

    @ManyToMany((type) => User, (user) => user.guilds, { lazy: true })
    public users: Promise<User[]> | User[];

    @OneToMany((type) => GuildMember, (member) => member.guild, { lazy: true })
    public members: Promise<GuildMember[]> | GuildMember[];
}
