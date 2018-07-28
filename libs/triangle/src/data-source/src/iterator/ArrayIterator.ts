import {Iterator} from "./Iterator"

export class ArrayIterator extends Iterator {
    protected array;
    protected index;

    constructor(array) {
        super();
        this.array = array;
        this.index = -1
    }

    next() {
        if (this.index + 1 < this.array.length) {
            this.index++;
            return true
        }
        return false
    }

    current() {
        return this.array[this.index]
    }

    reset() {
        this.index = -1
    }

    toArray() {
        return this.array.slice(0)
    }

    countable() {
        return true
    }

    count() {
        return this.array.length
    }
}
