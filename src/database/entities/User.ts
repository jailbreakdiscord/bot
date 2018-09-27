import { User as DUser } from "discord.js";
import { DBEntity } from "dd-botkit";
import { Entity, Column, OneToMany, ManyToMany } from "typeorm";
import { Message } from "./Message";
import { Guild } from "./Guild";

@Entity()
export class User extends DBEntity {
    /// The user's discord username
    @Column()
    public username: string;

    /// The user's discord discriminator
    @Column()
    public discriminator: string;

    @OneToMany((type) => Message, (message) => message.author)
    messages: Promise<Message[]>;

    @ManyToMany((type) => Guild, (guild) => guild.members)
    guilds: Promise<Guild[]>;

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

        return await user.save();
    }
}
