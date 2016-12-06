declare module "prosemirror/*";
declare module "*/markdown-parser";
declare module "*/keymap";
declare module "*/markdown-serializer";
declare module "*.less" {
    interface Styles {
        locals: { [identifier: string]: string };
        toString(): string;
    }
    const styles: Styles;
    export default styles;
}
declare module "lodash.invert";
declare module "classnames";
declare module 'ak-tabs';
declare module "ak-editor-content";
declare module "ak-editor-footer";
declare module "ak-editor-hyperlink-edit";
declare module "ak-editor-shared-styles";
declare module "ak-editor-toolbar";
declare module "ak-editor-toolbar-block-type";
declare module "ak-editor-toolbar-hyperlink";
declare module "ak-editor-toolbar-lists";
declare module "ak-editor-toolbar-text-formatting";
declare module "ak-editor-toolbar-feedback";
declare module "akutil-common-test";
declare module "autobind-decorator";
declare module "enzyme";
declare module "chai-enzyme";