import { startBot } from "./discord";
import { connect } from "./database";

import { bindEventHandlersToClient } from "./discord/events";
import { Logger } from "dd-botkit";

// tslint:disable-next-line
connect()
    .then(() => startBot())
    .then((app) => {
        // FIXME: Replace this when BotKit allows turning off default commands
        delete app.commandSystem.commands["unicode-emoji"];
  
        // Bind event handlers
        bindEventHandlersToClient(app.client);
        
        Logger.log(`Booted successfully! Logged into discord as ${app.client.user.tag}.`);
});
