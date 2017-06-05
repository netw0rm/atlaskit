import { MentionData } from '../src/types';

declare var require: {
    <T>(path: string): T;
};

// tslint:disable-next-line:no-var-requires
export const resultCraig: MentionData[] = require('./_mention-search-result-craig.json') as MentionData[];
// tslint:disable-next-line:no-var-requires
export const resultC: MentionData[] = require('./_mention-search-result-c.json') as MentionData[];
