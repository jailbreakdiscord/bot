import { DBEntity } from "dd-botkit";
import { Guild as DGuild } from "discord.js";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { GuildMember } from "./GuildMember";
import { Message } from "./Message";
import { User } from "./User";

@Entity()
export class GuildConfig extends DBEntity {

    /**
     * Creates a new, default guild configuration.
     */
    public static async createConfig() {
        return this.create().then(config => config.save());
    }

    @Column({ default: "!" })
    public commandPrefix: string;
}
