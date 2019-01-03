import Application, { Constants } from "dd-botkit";
import path from "path";
import { Configuration } from "../Config";
import { GuildPermissionSet } from "../database/entities/GuildPermissionSet";

const config = Configuration.bot;
export const app = new Application({
    token: config.token,
    commandDirectory: path.resolve(__dirname, "commands"),
    ROLES: config.roles,
    COMMAND_PREFIX: config.prefix,
    permissionsEntity: GuildPermissionSet,
    superuserCheck: id => config.superusers.includes(id)
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
