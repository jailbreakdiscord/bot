import { DBEntity } from "dd-botkit";
import { Guild as DGuild } from "discord.js";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, JoinTable } from "typeorm";
import { GuildMember } from "./GuildMember";
import { GuildConfig } from "./GuildConfig";
import { Message } from "./Message";
import { User } from "./User";

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
            guild.config = await GuildConfig.createConfig();
        }

        guild.name = discordGuild.name;
        guild.owner = await User.createOrUpdate(discordGuild.owner.user);
        return guild.save();
    }

    @Column()
    public name: string;

    @ManyToOne(type => User, user => user.ownedGuilds, { lazy: true })
    public owner: Promise<User> | User;

    @OneToOne(type => GuildConfig, { lazy: true })
    @JoinColumn()
    public config: Promise<GuildConfig> | GuildConfig;

    @OneToMany(type => Message, (message) => message.guild, { lazy: true })
    public messages: Promise<Message[]> | Message[];

    @OneToMany(type => GuildMember, (member) => member.guild, { lazy: true })
    public members: Promise<GuildMember[]> | GuildMember[];
}
