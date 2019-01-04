import Application, { Constants } from "dd-botkit";
import path from "path";
import { Configuration } from "../Config";
import { GuildPermissionSet } from "../database/entities/GuildPermissionSet";
import { Guild } from "../database/entities";
import { GlobalGuards } from "./guards";
import "./overrides";

const config = Configuration.bot;
export const app = new Application({
    token: config.token,
    commandDirectory: path.resolve(__dirname, "commands"),
    permissionsEntity: GuildPermissionSet,
    globalGuards: GlobalGuards,
    superuserCheck: id => config.superusers.includes(id),
    commandPrefix: async(guildID): Promise<string> => {
        // TODO: this is inefficient. this means we look up the guild twice per message.
        const guild = await Guild.findOne({ id: guildID });
        if (!guild) return "!";
        const guildConfig = await guild.config;
        return guildConfig.commandPrefix;
    }
});

process.on('unhandledRejection', console.error);

export function startBot(): Promise<Application> {
    Constants.applyPatches({
        BOT_ICON:
            "https://cdn.discordapp.com/icons/349243932447604736/d9fdba0cc7cbf5b50c8db2a919de91da.jpg",
        BOT_AUTHOR: "Jailbreak Staff Team"
    });

    return app.init().then(() => app);
}
