import { Message as DMessage } from "discord.js";
import { Entity, Column, ManyToOne, RelationId } from "typeorm";
import { DBEntity } from "dd-botkit";
import { Guild } from "./Guild";
import { User } from "./User";

/*
  TODO: 
  * Add user model & relation
*/
@Entity()
export class Message extends DBEntity {
  /// The content of the message
  @Column()
  public content: string;

  @ManyToOne(type => Guild, guild => guild.messages)
  guild: Promise<Guild>;

  @RelationId("guild")
  guildID: string;

  @ManyToOne(type => User, user => user.messages)
  author: Promise<User>;

  /// The ID of the message author
  @RelationId("author")
  authorID: string;

  /**
   * Creates or updates a Discord Message object.
   * @param discordMessage The discord.js message object to represent in the database.
   */
  public static async createOrUpdate(
    discordMessage: DMessage
  ): Promise<Message> {
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
