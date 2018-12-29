import { Entity, Column } from "typeorm";
import { DBEntity, PermissionSet, PermissionSetEntity } from "dd-botkit";

@Entity()
export class GuildPermissionSet extends DBEntity implements PermissionSetEntity {

    public static findByGuild(id: string) {
        return this.findByProp("guild", id);
    }

    public static findByRole(role: string) {
        return this.findByProp("roles", role, true);
    }

    public static findByMemberID(id: string) {
        return this.findByProp("members", id, true)
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

    private static findByProp(key: string, value: string, array: boolean = false): Promise<GuildPermissionSet[]> {
        return GuildPermissionSet.createQueryBuilder()
                .where(`${key} ${array ? '@> :value' : '= :value'}`, { value })
                .getMany();
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

    /**
     * Grant a permission to the set, automatically un-negating it if it is negated.
     * @param node the node to grant
     */
    public grant(node: string) {
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

    public addTarget(type: "role" | "member", ...IDs: string[]) {
        this[type + "s"] = this[type + "s"].concat(IDs);
    }

    public delTarget(type: "role" | "member", ...IDs: string[]) {
        IDs.forEach(id => this[type + "s"].remove(id));
    }
}