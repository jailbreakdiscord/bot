import { CommandError } from "dd-botkit";

export const NotFoundError: (message: string) => CommandError = message => new CommandError({
    title: "Not Found",
    message
});