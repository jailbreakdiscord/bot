import { startBot } from "./discord";
import { connect } from "./database";

import { bindEventHandlersToClient } from "./discord/events";
import { Logger, GroupManager, Essentials } from "dd-botkit";

import "./types";

// tslint:disable-next-line
connect()
    .then(() => startBot())
    .then((app) => app.commandSystem.loadCommands(GroupManager).then(() => app.commandSystem.loadCommands(Essentials)).then(() => app))
    .then((app) => {
        // Bind event handlers
        bindEventHandlersToClient(app.client);
        
        Logger.info(`Booted successfully! Logged into discord as ${app.client.user.tag}.`);
});
