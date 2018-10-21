import { User as DUser, GuildMember } from "discord.js";
import { DBEntity } from "dd-botkit";
import {
    Entity,
    Column,
    OneToMany,
    ManyToMany,
    PrimaryGeneratedColumn,
    CreateDateColumn
} from "typeorm";
import { Message } from "./Message";
import { Guild } from "./Guild";
import { LoggerOptions } from "typeorm/logger/LoggerOptions";
import { User } from "./User";

@Entity()
export class PublicLogsCase extends DBEntity {
    @Column()
    public reason: string;

    @Column()
    public points: number;

    @Column()
    public type: "ban" | "kick" | "warn" | "mute";

    // Will automatically increment on every new case.
    @PrimaryGeneratedColumn()
    public case: number;

    @CreateDateColumn()
    private createdAt: string;
}
