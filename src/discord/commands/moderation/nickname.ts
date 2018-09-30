import {
    Command, AccessLevel,
    CommandError, Logger,
    Guards
} from "dd-botkit";

export const NicknameCommand: Command = {
    opts: {
        name: "nickname",
        access: AccessLevel.MODERATOR,
        category: "Moderation",
        guards: [
            Guards.Argumented(
                "nickname",
                "Force changes the nickname of a user",
                [{
                    name: "user",
                    type: "user",
                    required: true
                },
                {
                    name: "nickname",
                    type: "string",
                    required: true
                }]
            )
        ]
    },
    handler: async (msg, next) => {
        const [user, nickname] = msg.args;

        try () {
          await msg.guild.members.get((user as any).id).setNickname(nickname)
          await msg.react('✅')
          // TODO: Add event logging.
        } catch (e) {
          await msg.reply(`That wasn't supposed to happen! Here's the error message for reference: ${e}`)
        }
    }
}
