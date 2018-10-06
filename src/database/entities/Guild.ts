import { Guild as DGuild } from "discord.js";
import { Entity, Column, OneToMany, ManyToMany } from "typeorm";
import { DBEntity } from "dd-botkit";
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
        guild.ownerID = discordGuild.ownerID;
        return guild.save();
    }
    /// The name of the guild
    @Column()
    public name: string;

    /// The ID of the guild owner
    // TODO: When we have a User model, store a relation to this
    @Column()
    public ownerID: string;

    @OneToMany(type => Message, message => message.guild)
    public messages: Promise<Message[]>;

    @ManyToMany(type => User, user => user.guilds)
    public members: Promise<User[]>;
}
