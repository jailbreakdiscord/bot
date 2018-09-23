import { startBot } from "./discord";
import { connect } from "./database";

import { bindEventHandlersToClient } from "./discord/events";

connect()
    .then(() => startBot())
    .then(app => {
        // FIXME: Replace this when BotKit allows turning off default commands
        delete app.commandSystem.commands["unicode-emoji"];

        // Bind event handlers
        bindEventHandlersToClient(app.client);
        
        console.log(`Booted successfully! Logged into discord as ${app.client.user.tag}.`);
});