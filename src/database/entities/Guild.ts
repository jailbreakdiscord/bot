import { Entity, Column } from "typeorm";
import { DBEntity } from "dd-botkit";

@Entity()
export class Guild extends DBEntity {}