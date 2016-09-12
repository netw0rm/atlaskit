export default (text: string, regexp: RegExp): Iterable<RegExpExecArray> => ({
  [Symbol.iterator]() {
    return {
      next(): IteratorResult<RegExpExecArray> {
        let match = regexp.exec(text);
        return {
          done: match === null,
          value: match as any,
        };
      }
    };
  }
});
