import { MentionsResult } from '@atlaskit/mention';

declare var require: {
  <T>(path: string): T;
};

// tslint:disable-next-line:no-var-requires
const mentionData: MentionsResult = require('../json-data/mention-data.json') as MentionsResult;

export const mentionDataSize = mentionData.mentions.length;

export default mentionData;
