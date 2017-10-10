import { MacroProvider, MacroAttributes } from '../src/editor/types';

export class MockMacroProvider implements MacroProvider {
  public config = {
    placeholderBaseUrl: '//pug.jira-dev.com/'
  };

  openMacroBrowser(macroAttributes?: MacroAttributes): void {}
}

export const macroProvider = new MockMacroProvider();
export const macroProviderPromise = Promise.resolve(macroProvider);
