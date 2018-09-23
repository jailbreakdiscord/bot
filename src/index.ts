import { startBot } from "./discord";
import { connect } from "./database";

connect()
    .then(() => startBot())
    .then(app => {
        console.log(`Booted successfully! Logged into discord as ${app.client.user.tag}.`);
});