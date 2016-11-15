declare module "collapse-whitespace" {
    export default function collapse(node: Node, blockTest?: (node: Node) => boolean);
}