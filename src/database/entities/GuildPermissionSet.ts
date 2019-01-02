import { CommandError, DBEntity, PermissionSetEntity } from "dd-botkit";
import { Column, Entity } from "typeorm";

@Entity()
export class GuildPermissionSet extends DBEntity implements PermissionSetEntity {

    public get json() {
        return {
            guild: this.guild,
            name: this.name,
            roles: this.roles,
            members: this.members,
            grantedPermissions: this.grantedPermissions,
            negatedPermissions: this.negatedPermissions
        };
    }

    public static findByGuild(id: string) {
        return this.findByProp("guild", id).getMany();
    }

    public static findByRole(role: string) {
        return this.findByProp("roles", role, true).getMany();
    }

    public static findByMemberID(id: string, guild: string) {
        return this.findByProp("members", id, true).andWhere('guild = :guild', { guild }).getMany();
    }

    public static findByName(name: string, guild: string) {
        return this.findOne({ name, guild });
    }

    /**
     * Determine whether this name is currently free
     * @param name the name to check for
     */
    public static async isNameFree(name: string, guild: string): Promise<boolean> {
        return GuildPermissionSet.findOne({ name, guild }).then(res => !res);
    }

    /**
     * Creates a blank permission set
     * @param name set name
     * @param guild set guild
     */
    public static async createPermissionSet(name: string, guild: string): Promise<GuildPermissionSet> {
        if (!(await this.isNameFree(name, guild))) {
            throw new CommandError({
                message: "There is already a permission set with this name.",
                title: "Conflicting Permission Set"
            });
        }

        return this.create({
            name,
            guild,
            roles: [],
            members: [],
            grantedPermissions: [],
            negatedPermissions: []
        }).then(entity => entity.save());
    }

    private static findByProp(key: string, value: string, array: boolean = false) {
        return GuildPermissionSet.createQueryBuilder()
                .where(`${key} ${array ? '@> :value' : '= :value'}`, { value: [value] })
    }

    @Column()
    public guild: string;

    @Column()
    public name: string;

    @Column("text", {array: true})
    public roles: string[];

    @Column("text", {array: true})
    public members: string[];

    @Column("text", {array: true})
    public grantedPermissions: string[];

    @Column("text", {array: true})
    public negatedPermissions: string[];

    /**
     * Grant a permission to the set, automatically un-negating it if it is negated.
     * @param node the node to grant
     */
    public grant(node: string) {
        if (!node) return;

        if (this.negatedPermissions.includes(node)) {
            this.negatedPermissions.remove(node);
        }

        if (!this.grantedPermissions.includes(node)) {
            this.grantedPermissions.push(node);
        }
    }

    /**
     * Negate a permission from the set, automatically un-granting it if it is granted.
     * @param node the node to negate
     */
    public negate(node: string) {
        if (!node) return;

        if (this.grantedPermissions.includes(node)) {
            this.grantedPermissions.remove(node);
        }

        if (!this.negatedPermissions.includes(node)) {
            this.negatedPermissions.push(node);
        }
    }

    /**
     * Reset a permission in the set
     * @param node the node to reset
     */
    public reset(node: string) {
        this.grantedPermissions.remove(node);
        this.negatedPermissions.remove(node);
    }

    /**
     * Add a role or member target
     * @param type whether these are role or member ids
     * @param IDs the ids
     */
    public addTarget(type: "role" | "member", ...IDs: string[]) {
        IDs = IDs.filter(id => !!id);
        this[type + "s"] = this[type + "s"].concat(IDs);
    }

    /**
     * Remove a role or member target
     * @param type whether these are role or member ids
     * @param IDs the ids
     */
    public delTarget(type: "role" | "member", ...IDs: string[]) {
        IDs = IDs.filter(id => !!id);
        IDs.forEach(id => this[type + "s"].remove(id));
    }
}