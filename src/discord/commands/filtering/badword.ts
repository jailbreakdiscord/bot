import { Command, AccessLevel, Guards } from "dd-botkit";
import { getBadWordHandler } from "../..";
export const BanCommand: Command = {
    opts: {
        name: "badword",
        aliases: ["bw"],
        access: AccessLevel.MODERATOR,
        category: "Filtering",
        guards: [
            Guards.Argumented("badword", "Add or remove a bad word.", [
                {
                    name: "action",
                    type: "string",
                    required: true
                },
                {
                    name: "word",
                    type: "string",
                    required: false,
                    unlimited: true
                }
            ])
        ]
    },
    handler: async (message, next) => {
        const [action, word]: string | any = message.args;
        if (action !== "add" && action !== "remove") return message.fail();
        if (action === "add") {
            await getBadWordHandler().addWord(word, message.guild);
        } else {
            await getBadWordHandler().removeWord(word, message.guild);
        }
        await message.success();
    }
};
