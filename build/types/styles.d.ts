declare module '*.less' {
  interface Styles {
    locals: { [identifier: string]: any };
    toString(): string;
  }
  const locals: { [identifier: string]: any };
  export = locals;
}
