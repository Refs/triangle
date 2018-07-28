import { WrappedIterator } from "./WrappedIterator";
import { compileGetter } from "../../../Utils/Data";

export class SelectIterator extends WrappedIterator {
    protected getter;

    constructor(iter, getter) {
        super(iter);
        this.getter = getter;
    }

    current() {
        return this.getter(super.current())
    }

    countable() {
        return this.iter.countable()
    }

    count() {
        return this.iter.count()
    }
}
