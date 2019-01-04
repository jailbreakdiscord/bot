import { Message as DBMessage } from "../database/entities/Message";
import { Guild as DBGuild } from "../database/entities/Guild";

declare module "discord.js" {
    interface Message { 
        db: DBMessage;
    }

    interface Guild {
        db: DBGuild;
    }
}
