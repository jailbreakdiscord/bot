import { User as DUser, GuildMember } from "discord.js";
import { DBEntity } from "dd-botkit";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PublicLogsCase extends DBEntity {
    @Column()
    public reason: string;

    @Column()
    public points: number;

    @Column()
    public type: "ban" | "kick" | "warn" | "mute";

    // Will automatically increment on every new case.
    @PrimaryGeneratedColumn("increment")
    public case: number;
}
