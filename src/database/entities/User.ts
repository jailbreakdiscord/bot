import { DBEntity } from "dd-botkit";
import { User as DUser } from "discord.js";
import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { Guild } from "./Guild";
import { Message } from "./Message";

@Entity()
export class User extends DBEntity {
    
    /**
     * Creates or updates a Discord User object.
     * @param discordUser The discord.js guild object to represent in the database.
     */
    public static async createOrUpdate(discordUser: DUser): Promise<User> {
        let user = await User.findOne({ id: discordUser.id });

        if (!user) {
            user = new User();
            user.id = discordUser.id;
        }

        user.username = discordUser.username;
        user.discriminator = discordUser.discriminator;

        return user.save();
    }

    @Column()
    public username: string;

    @Column()
    public discriminator: string;

    @OneToMany((type) => Message, (message) => message.author, { lazy: true })
    public messages: Promise<Message[]>;

    @ManyToMany((type) => Guild, (guild) => guild.users, { lazy: true })
    public guilds: Promise<Guild[]>;

    @OneToMany(type => Guild, guild => guild.owner, { lazy: true })
    public ownedGuilds: Promise<Guild[]> | Guild[];
}