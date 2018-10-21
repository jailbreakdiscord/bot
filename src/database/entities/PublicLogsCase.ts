import { User as DUser } from "discord.js";
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

@Entity()
export class PublicLogsCase extends DBEntity {
    @Column()
    public reason: string;

    @Column()
    public points: number | undefined;

    @Column()
    public type: "ban" | "kick" | "warn" | "mute";

    @CreateDateColumn()
    private createdAt: string;

    // Will automatically increment on every new case.
    @PrimaryGeneratedColumn()
    private case: number;
}
