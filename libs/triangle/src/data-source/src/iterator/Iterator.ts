
export abstract class Iterator {
    toArray() {
        const result = [];
        this.reset();
        while (this.next()) {
            result.push(this.current())
        }
        return result
    }

    countable() {
        return false
    }

    abstract reset();
    abstract next();
    abstract current();
}
