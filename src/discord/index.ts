import path from "path";
import Application, { Constants } from "dd-botkit";

import { Configuration } from "../Config";
import { PublicLogger as _PublicLogger } from "./utilities/PublicLogsHandler";
import { MuteHandler as _MuteHandler } from "./utilities/MuteHandler";
import { WarnHandler as _WarnHandler } from "./utilities/WarnHandler";
import { BadWordHandler as _BadWordHandler } from "./utilities/BadWordHandler";
const config = Configuration.bot;
export const app = new Application({
    token: config.token,
    commandDirectory: path.resolve(__dirname, "commands"),
    ROLES: config.roles,
    COMMAND_PREFIX: config.prefix
});

let PublicLogger: _PublicLogger;
let MuteHandler: _MuteHandler;
let WarnHandler: _WarnHandler;
let BadWordHandler: _BadWordHandler;

export function startBot(): Promise<Application> {
    Constants.applyPatches({
        BOT_ICON:
            "https://cdn.discordapp.com/icons/349243932447604736/d9fdba0cc7cbf5b50c8db2a919de91da.jpg",
        BOT_AUTHOR: "Jailbreak Staff Team"
    });

    return app.init().then(async () => {
        PublicLogger = new _PublicLogger(app.client, "503823665373118465");
        BadWordHandler = new _BadWordHandler(app.client);
        WarnHandler = new _WarnHandler(app.client, "493378389802090498");
        MuteHandler = new _MuteHandler(
            app.client,
            "493378389802090498",
            "504937932210307082"
        );
        await MuteHandler.bindCron();
        return app;
    });
}

// Getter method for logger.
export function getPublicLogger() {
    return PublicLogger;
}

// Getter method for mute handler.
export function getMuteHandler() {
    return MuteHandler;
}

// Getter method for warn handler.
export function getWarnHandler() {
    return WarnHandler;
}

// Getter method for bad word handler.
export function getBadWordHandler() {
    return BadWordHandler;
}
