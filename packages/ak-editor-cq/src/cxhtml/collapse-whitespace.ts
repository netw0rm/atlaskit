import * as module from "collapse-whitespace";

declare module "collapse-whitespace";

interface ICollapseWhitespace {
  (node: Node, blockTest?: (node: Node) => boolean): void;
}

const collapseWhitespace: ICollapseWhitespace = module as any;
export default collapseWhitespace;
