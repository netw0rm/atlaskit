import mentionData, { mentionDataSize } from '../../../src/mention/mention-data';

describe('#mention data', () => {
  it('expected mention data', () => {
    expect(mentionDataSize).toBe(22);
  });

  it('expected a user to have a nickname', () => {
    expect(mentionData.mentions[0].nickname).not.toBe(undefined);
  });

  it('expected a user to have an access level', () => {
    expect(mentionData.mentions[0].accessLevel).not.toBe(undefined);
  });

  it('expected a user to have an avatar url', () => {
    expect(mentionData.mentions[0].avatarUrl).not.toBe(undefined);
  });
});
