import { WrappedIterator } from "./WrappedIterator";

export class MapIterator extends WrappedIterator {
    protected index;
    protected mapper;

    constructor(iter, mapper) {
        super(iter);
        this.index  = -1;
        this.mapper = mapper
    }

    current() {
        return this.mapper(super.current(), this.index)
    }

    next() {
        const hasNext = super.next();
        if (hasNext) {
            this.index++
        }
        return hasNext
    }
}
