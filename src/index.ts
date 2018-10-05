import { startBot } from "./discord";
import { connect } from "./database";
import { MemeManager as _MemeManager } from "./utilities/memes";
import { bindEventHandlersToClient } from "./discord/events";
import { Logger } from "dd-botkit";
const MemeManager = new _MemeManager();
connect()
    .then(() => startBot())
    .then((app) => {
        // FIXME: Replace this when BotKit allows turning off default commands
        delete app.commandSystem.commands["unicode-emoji"];

        // Bind event handlers
        bindEventHandlersToClient(app.client);
        //prettier-ignore
        Logger.log(`Booted successfully! Logged into discord as ${app.client.user.tag}.`);
    });

process.on("unhandledRejection", console.error);

export { MemeManager };
