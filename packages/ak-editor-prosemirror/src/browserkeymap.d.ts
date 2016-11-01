declare module "browserkeymap" {
    interface KeymapOptions {
        name?: string;
        call?: (key: string, context?: any) => any;
    }

    // In the real source for browserkeymap this isn't a default export, but instead
    // a 'export = Keymap' style module definition. These are incompatible with ES2015,
    // and webpack provides a synthetic 'default' export to work around this. So as
    // long as we're consuming browserkeymap via webpack, it's valid for this type
    // definition to expose it as a default export.
    export default class Keymap {
        constructor(keys: { [key: string]: any }, options?: KeymapOptions);
    }
}