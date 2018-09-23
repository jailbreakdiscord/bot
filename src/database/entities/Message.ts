import { Message as DMessage } from "discord.js";
import { Entity, Column } from "typeorm";
import { DBEntity } from "dd-botkit";

/*
  TODO: 
  * Add user model & relation
*/
@Entity()
export class Message extends DBEntity {

    /// The ID of the message author
    // TODO: When we have a User model, store a relation to this
    @Column()
    public authorID: string;

    /// The content of the message
    @Column()
    public content: string;
    
    /**
     * Creates or updates a Discord Message object.
     * @param discordMessage The discord.js message object to represent in the database.
     */
    public static async createOrUpdate(discordMessage: DMessage): Promise<Message> {
        let message = await Message.findOne({ id: discordMessage.id });

        if (!message) {
            message = new Message();
            message.id = discordMessage.id;
        }

        message.authorID = discordMessage.author.id;
        message.content = discordMessage.content;

        return await message.save();
    }
}