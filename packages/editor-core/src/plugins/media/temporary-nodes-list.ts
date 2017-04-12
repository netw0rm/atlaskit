export default class TemporaryNodesList {
  private map: Map<string, Node[]>;

  constructor() {
    // Note: because we're targeting ES5 and because V8 doesn't currently allow
    //       extending built-in classes (like Map), we're using Map internally
    //       and proxying several methods (like delete, forEach ...)
    //       https://github.com/Microsoft/TypeScript/issues/10853
    //       https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    this.map = new Map();
  }

  get(mediaId: string): Node[] {
    let list: Node[] | undefined = this.map.get(mediaId);

    if (!list) {
      list = [];
    }

    return list;
  }

  push(mediaId: string, node: Node): this {
    let list: Node[] | undefined = this.map.get(mediaId);

    if (!list) {
      list = [];
      this.map.set(mediaId, list);
    }

    list.push(node);

    return this;
  }

  forEach(...args: any[]) {
    return this.map.forEach.apply(this.map, args);
  }

  delete(...args: any[]) {
    return this.map.delete.apply(this.map, args);
  }

  clear(...args: any[]) {
    return this.map.clear.apply(this.map, args);
  }
}

