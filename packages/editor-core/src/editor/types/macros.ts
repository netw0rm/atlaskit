export type DisplayType = 'INLINE' | 'BLOCK';

export type BodyType = 'NONE' | 'RICH-TEXT-BODY' | 'PLAIN-TEXT-BODY';

export type MacroType = 'NONE-INLINE' | 'NONE-BLOCK' | 'RICH-TEXT-BODY-BLOCK' | 'PLAIN-TEXT-BODY-BLOCK';

export interface MacroProperties {
  'fab:display-type'?: string;
  'fab:placeholder-url'?: string;
  'ac:rich-text-body'?: string;
  'ac:plain-text-body'?: string;
}

export interface Macro {
  macroId: string;
  macroName: string;
  macroType: MacroType;
  properties: MacroProperties;
  params: any;
}

export interface MacroAttributes {
  macroId: string;
  params: any;
}

export interface MacroConfig {
  placeholderBaseUrl: string;
}

export interface MacroProvider {
  config: MacroConfig;
  /**
   * If "macro" param is passed in, it will open macro browser for editing the macro
   */
  openMacroBrowser(macro?: Macro): void;
}
