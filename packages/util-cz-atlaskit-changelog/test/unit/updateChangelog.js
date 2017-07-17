import updateChangelog from '../../src/updateChangelog';

describe('updateChangelog()', () => {
  it('Handles when "## Unreleased" exists', () => {
    const oldChangelog = `# @atlaskit/packageName

## Unreleased

`;

    const expectedNewLog = `# @atlaskit/packageName

## Unreleased

ASCII`;
    const newLog = updateChangelog(oldChangelog, 'ASCII', 'errorPath');
    expect(JSON.stringify(newLog)).toEqual(JSON.stringify(expectedNewLog));
  });
  it('Handles when "## Unreleased" does not exist', () => {
    const oldChangelog = `# @atlaskit/packageName

`;

    const expectedNewLog = `# @atlaskit/packageName

## Unreleased

ASCII
`;
    const newLog = updateChangelog(oldChangelog, 'ASCII', 'errorPath');
    expect(JSON.stringify(newLog)).toEqual(JSON.stringify(expectedNewLog));
  });
});
