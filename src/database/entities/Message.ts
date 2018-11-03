import { Message as DMessage } from "discord.js";
import { Entity, Column, ManyToOne, Index } from "typeorm";
import { DBEntity } from "dd-botkit";
import { Guild } from "./Guild";
import { User } from "./User";

/*
  TODO: 
  * Add user model & relation
*/
@Entity()
export class Message extends DBEntity {
    /**
     * Creates or updates a Discord Message object.
     * @param discordMessage The discord.js message object to represent in the database.
     */
    public static async createOrUpdate(
        discordMessage: DMessage
    ): Promise<Message> {
        let message = await Message.findOne({ id: discordMessage.id });
        const author = await User.createOrUpdate(discordMessage.author);

        // TODO: make this work when the message comes from a dm.
        const guild = await Guild.createOrUpdate(discordMessage.guild);

        if (!message) {
            message = new Message();
            message.id = discordMessage.id;
        }
        message.guild = guild;
        message.author = author;
        message.content = discordMessage.content;

        return message.save();
    }

    /// The content of the message
    @Column()
    public content: string;

    @ManyToOne((type) => Guild, (guild) => guild.messages, { lazy: true })
    public guild: Promise<Guild> | Guild;

    @ManyToOne((type) => User, (user) => user.messages, { lazy: true })
    public author: Promise<User> | User;
}
