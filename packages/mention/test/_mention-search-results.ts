import { Mention } from '../src/types';

declare var require: {
    <T>(path: string): T;
};

// tslint:disable-next-line:no-var-requires
export const resultCraig: Mention[] = require('./_mention-search-result-craig.json') as Mention[];
// tslint:disable-next-line:no-var-requires
export const resultC: Mention[] = require('./_mention-search-result-c.json') as Mention[];
