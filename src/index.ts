import { startBot } from './discord';
import { connect } from './database';

connect()
    .then(() => startBot())
    .then((app) => {
        // FIXME: Replace this when BotKit allows turning off default commands
        delete app.commandSystem.commands['unicode-emoji'];

        console.log(
            `Booted successfully! Logged into discord as ${
                app.client.user.tag
            }.`
        );
    });
