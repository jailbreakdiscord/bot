import path from "path";
import Application from "dd-botkit";

import { Configuration } from "../Config";

const config = Configuration.bot;
export const app = new Application({
    token: config.token, 
    commandDirectory: path.resolve(__dirname, "commands"), 
    ROLES: config.roles,
    COMMAND_PREFIX: config.prefix
});

export function startBot(): Promise<Application> {
    return app.init().then(() => app);
}