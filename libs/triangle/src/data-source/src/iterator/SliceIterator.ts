import { WrappedIterator } from "./WrappedIterator";

export class SliceIterator extends WrappedIterator {
    protected skip;
    protected take;
    protected pos;

    constructor(iter, skip, take) {
        super(iter);
        this.skip = Math.max(0, skip);
        this.take = Math.max(0, take);
        this.pos  = 0
    }

    next() {
        if (this.pos >= this.skip + this.take) {
            return false
        }
        while (this.pos < this.skip && this.iter.next()) {
            this.pos++
        }
        this.pos++;
        return this.iter.next()
    }

    reset() {
        super.reset();
        this.pos = 0
    }

    countable() {
        return this.iter.countable()
    }

    count() {
        return Math.min(this.iter.count() - this.skip, this.take)
    }
}
