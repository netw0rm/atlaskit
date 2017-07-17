import splitCommitMessage from '../../src/splitCommitMessage';

describe('splitCommitMessage', () => {
  it('ignores commit messages outside of scope', () => {
    const commitMessage = `docs(docs): something with docsc

affects: @atlaskit/util-cz-atlaskit-changelog`;
    const message = splitCommitMessage(commitMessage);
    expect(message).toBe(null);
  });
  it('parses out package information for single package', () => {
    const commitMessage = `fix(component): short imperative

affects: @atlaskit/util-cz-atlaskit-changelog`;
    const message = splitCommitMessage(commitMessage);
    expect(message.dirPaths).toHaveLength(1);
    expect(message.dirPaths[0].includes('util-cz-atlaskit-changelog/docs')).toBeTruthy();
    expect(message.packageNames).toHaveLength(1);
    expect(message.packageNames[0]).toBe('util-cz-atlaskit-changelog');
    expect(message.readmePaths).toHaveLength(1);
    expect(message.readmePaths[0].includes('util-cz-atlaskit-changelog/docs/CHANGELOG.md')).toBeTruthy();
  });
  it('includes a basic message with fix', () => {
    const commitMessage = `fix(component): short imperative

affects: @atlaskit/util-cz-atlaskit-changelog`;
    const message = splitCommitMessage(commitMessage);
    expect(message.text).toBe(`* bug fix; short imperative
`);
  });
  it('includes a basic message with feature', () => {
    const commitMessage = `feat(component): handle feature commit

affects: @atlaskit/util-cz-atlaskit-changelog`;
    const message = splitCommitMessage(commitMessage);
    expect(message.text).toBe(`* feature; handle feature commit
`);
  });
  it('includes commit message and breaking change when breaking occurs', () => {
    const commitMessage = `refactor(component): we shall have a breaking change

affects: @atlaskit/util-cz-atlaskit-changelog


BREAKING CHANGE:
Everything borked`;
    const message = splitCommitMessage(commitMessage);
    expect(message.text).toBe(`* breaking; Everything borked
* breaking; we shall have a breaking change
`);
  });
  it('handles a closed issue', () => {
    const commitMessage = `feat(package): with issue closed

affects: @atlaskit/util-cz-atlaskit-changelog


ISSUES CLOSED: #1234`;
    const message = splitCommitMessage(commitMessage);
    expect(message.text).toBe(`* feature; with issue closed (issues closed: #1234)
`);
  });
  it('handles extra text being in the message with a breaking change', () => {
    const commitMessage = `feat(refactor): extra plus breaking

affects: @atlaskit/util-cz-atlaskit-changelog

Here is the extra text
and a second line

BREAKING CHANGE:
things orked`;
    const message = splitCommitMessage(commitMessage);
    expect(message.text).toBe(`* breaking; things orked
* breaking; extra plus breaking
`);
  });
  it('handles a ":" in the commit message', () => {
    const commitMessage = `feat(component): handle: feature commit

affects: @atlaskit/util-cz-atlaskit-changelog`;
    const message = splitCommitMessage(commitMessage);
    expect(message.text).toBe(`* feature; handle: feature commit
`);
  });
  it('parses package information for commit affecting multiple packages', () => {
    const commitMessage = `feat(component): multi-impact

affects: @atlaskit/app-switcher, @atlaskit/util-cz-atlaskit-changelog`;
    const message = splitCommitMessage(commitMessage);
    expect(message.dirPaths).toHaveLength(2);
    expect(message.packageNames).toHaveLength(2);
    expect(message.readmePaths).toHaveLength(2);
  });
});
