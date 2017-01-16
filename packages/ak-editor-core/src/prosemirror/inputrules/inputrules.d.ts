import { Plugin, ProseMirror } from '../';

export class InputRule {
  constructor(match: RegExp, filter?: string, handler: string | ((pm: ProseMirror, match: string[], pos: number) => void)) {}

  handler(pm: ProseMirror, match: string[], pos: number): void;
}

export interface InputRules {
  addRule(rule: InputRule): void;
  removeRule(rule: InputRule): boolean;
}


export const inputRules: Plugin<InputRules>;
