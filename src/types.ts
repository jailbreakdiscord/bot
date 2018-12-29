declare interface Array<T> {
    remove(o: T): T[];
}

Array.prototype.remove = function(o) {
    const index = this.indexOf(o);

    if (index === -1) return this;

    this.splice(index, 1);

    return this;
}

declare interface String {
    capitalize(): string;
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}