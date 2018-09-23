import { 
    Command, AccessLevel,
    CommandError, Logger,
    Guards
} from "dd-botkit";

export const TestCommand: Command = {
    opts: {
        name: "test"
    },
    handler: async (msg, next) => {
        await msg.reply("Screwa youa i hate aaron and logan.");
    }
}
