import MentionResource from '../test/_mock-ak-mention-resource';

export const resourceProvider = new MentionResource({
  minWait: 10,
  maxWait: 25,
});

export const mentionProvider = Promise.resolve(resourceProvider);
