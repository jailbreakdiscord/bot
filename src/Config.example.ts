import { ConnectionOptions } from "typeorm";

export class Configuration {
    static bot: any = {
        // The discord bot token.
        token: "", // TODO: This should eventually be per-server.
        prefix: "!", // TODO: Yet again, should be configured per server.
        roles: {
            moderator: ["493380131327574021"],
            admin: ["493380066026192907"],
            root: ["493378617397739532"]
        }
    };

    // Database configuration options.
    static database: ConnectionOptions = {
        type: "postgres",
        host: "localhost",
        port: 5432,
        database: "JailbreakBot",
        synchronize: true
    };
}
