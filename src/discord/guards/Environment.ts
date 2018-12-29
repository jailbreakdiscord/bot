import { CommandHandler, CommandError } from "dd-botkit";

export type Environment = 'dm' | 'group' | 'text' | 'voice' | 'category';

export const EnvironmentGuard: (env: Environment[]) => CommandHandler = env => (message, next) => {
    if (!env.includes(message.channel.type)) {
        return next(new CommandError({
            message: "This command is not available for this channel environment."
        }));
    }
    next();
}