declare var require: {
    <T>(path: string): T;
};

/* TODO: Change to MentionDescription after PR with name change has been released */
interface MentionResult {
    mentions: any[];
}

// tslint:disable-next-line:no-var-requires
const mentionData: MentionResult = require('./mention-data.json') as MentionResult;

export const mentionDataSize = mentionData.mentions.length;

export default mentionData;
