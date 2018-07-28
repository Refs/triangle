export class RecursiveIterator {
  protected stackedIter: RecursiveIterator[];

  constructor(protected it: RecursiveIterator) {
  }

  public getChildren() {

  }

  public hasChildren() {

  }

  public next() {
    if (this.it) {
      const next = this.it.next();
      if (next) {
        if (this.it.current().hasChildren()) {
          this.stackedIter.push(this.it);
          this.it = this.it.getChildren();
        }
        return true;
      } else if(this.stackedIter.length > 0) {
        this.it = this.stackedIter.pop();
        return this.next();
      } else {
        return false;
      }
    }
  }

  public current() {
    this.it.current();
  }
}