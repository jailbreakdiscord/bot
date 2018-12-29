import { Commands, AccessLevel, CommandError, CommandHandler, PermissionSet, Command } from "dd-botkit";
import { EnvironmentGuard } from "../guards/Environment";
import { Argumented } from "dd-botkit/out/commands/guards";
import { GuildPermissionSet } from "../../database/entities/GuildPermissionSet";
import { NotFoundError } from "../errors";
import { inspect } from "util";

const PermissionsAccessLevel = AccessLevel.ADMIN;

const PermSetLoader: CommandHandler = async (message, next) => {
    const [name] = message.args.map(r => r.toString());

    const guild = message.guild.id;

    const permSet = message.data.permSet = await GuildPermissionSet.findByName(name.toString(), guild);

    if (!permSet) {
        return next(NotFoundError("No permission set with that name exists."));
    }

    next();
}

/**
 * Command builder for a membership target modifier
 * @param target role or member
 * @param state add or remove
 */
const TargetModifier: (target: "role" | "member", state: "add" | "del") => Command = (target, state) => ({
    opts: {
        name: `${state}-${target}-pset`,
        node: "perm.manage-members",
        access: PermissionsAccessLevel,
        guards: [
            // ternary stuff in interpolation is for grammar
            Argumented(`${state}-${target}-pset`, `${state === "add" ? "Add" : "Remove"} ${target}s ${state === "add" ? "to" : "from"} a permission set`, [
                {
                    type: "string",
                    name: "pset-name",
                    required: true
                },
                {
                    type: "string",
                    name: `${target}-ids`,
                    required: true,
                    unlimited: true
                }
            ]),
            PermSetLoader
        ]
    },
    handler: async (message, next) => {
        const [, ...ids] = message.args.map(i => i.toString());

        const permSet: GuildPermissionSet = message.data.permSet;

        // addTarget() or delTarget()
        permSet[state + "Target"](target, ...ids);

        await permSet.save();
        await message.success();
        next();
    }
});

/**
 * Command builder for a permission state modifier
 * @param action the permission action
 */
const PermissionStateModifier: (action: "grant" | "negate" | "reset") => Command = action => ({
    opts: {
        name: `${action}-perm`,
        node: "perm.manage-perm",
        access: PermissionsAccessLevel,
        guards: [
            // ternary stuff in interpolation is for grammar
            Argumented(`${action}-perm`, `${action.capitalize()} a permission ${action === "negate" ? "from" : "in"} a permission set`, [
                {
                    type: "string",
                    name: "name",
                    required: true
                },
                {
                    type: "string",
                    name: "permissions",
                    required: true,
                    unlimited: true
                }
            ]),
            PermSetLoader
        ]
    },
    handler: async (message, next) => {
        const [, ...permissions] = message.args.map(p => p.toString());

        const permSet: GuildPermissionSet = message.data.permSet;

        // calls permSet.grant(), permSet.negate(), permSet.reset() depending on action variable
        permissions.forEach(permission => permSet[action](permission));

        await permSet.save();
        await message.success();
    }
})

export const PermissionsCommands: Commands = {
    opts: {
        guards: [EnvironmentGuard(['text'])]
    },
    commands: [
        {
            opts: {
                name: "create-pset",
                node: "perm.create-pset",
                access: PermissionsAccessLevel,
                guards: [
                    Argumented("create-pset", "Create a permission set", [
                        {
                            type: "string",
                            name: "name",
                            required: true
                        }
                    ])
                ]
            },
            /**
             * Creates a bare permission set
             */
            handler: async (message, next) => {
                const [name] = message.args;
                const guild = message.guild.id;

                if (!(await GuildPermissionSet.isNameFree(name.toString(), guild))) {
                    return next(new CommandError({
                        title: "Name Unavailable",
                        message: `The name \`${name}\` is already taken. Please choose another name.`
                    }));
                }

                const permSet = await GuildPermissionSet.create({
                    guild,
                    name: name.toString(),
                    roles: [],
                    members: [],
                    grantedPermissions: [],
                    negatedPermissions: []
                });

                const id = await permSet.save().then(set => set.id);

                await message.reply(`Permission set created. Name: \`${name}\``);
                next();
            }
        },
        {
            opts: {
                name: "get-pset",
                node: "perm.get-pset",
                access: PermissionsAccessLevel,
                guards: [
                    Argumented("get-pset", "Get a permission set", [
                        {
                            type: "string",
                            name: "name",
                            required: true
                        }
                    ]),
                    PermSetLoader
                ]
            },
            /**
             * Returns a raw util.inspect() of the permission set
             */
            handler: async (message, next) => {
                const permSet: GuildPermissionSet = message.data.permSet;

                const description = inspect(permSet.json, false, 1);

                await message.reply(`\`\`\`js\n${description}\n\`\`\``);

                next();
            }
        },
        TargetModifier("role", "add"),
        TargetModifier("role", "del"),
        TargetModifier("member", "add"),
        TargetModifier("member", "del"),
        PermissionStateModifier("grant"),
        PermissionStateModifier("negate"),
        PermissionStateModifier("reset")
    ]
}