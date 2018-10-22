import path from "path";
import Application, { Constants } from "dd-botkit";

import { Configuration } from "../Config";
import { PublicLogger as _PublicLogger } from "./utilities/PublicLogger";
const config = Configuration.bot;
export const app = new Application({
    token: config.token,
    commandDirectory: path.resolve(__dirname, "commands"),
    ROLES: config.roles,
    COMMAND_PREFIX: config.prefix
});

let PublicLogger: _PublicLogger;

export function startBot(): Promise<Application> {
    Constants.applyPatches({
        BOT_ICON:
            "https://cdn.discordapp.com/icons/349243932447604736/d9fdba0cc7cbf5b50c8db2a919de91da.jpg",
        BOT_AUTHOR: "Jailbreak Staff Team"
    });

    return app.init().then(() => {
        PublicLogger = new _PublicLogger(app.client, "503823665373118465");
        return app;
    });
}

// Getter method for logger.
export function getPublicLogger() {
    return PublicLogger;
}
