import transformCommitMessage from '../../build/bin/changelogs/transformCommitMessage';

describe('transformCommitMessage', () => {
  it('ignores commit messages that do not cause release', () => {
    const commitMessage = `docs(docs): something with docsc

affects: @atlaskit/util-cz-atlaskit-changelog`;
    const message = transformCommitMessage({ message: commitMessage, hash: 'ABCDEFGHIJKLMNO' });
    expect(message).toBe(null);
  });
  it('includes a basic message with fix', () => {
    const commitMessage = `fix(component): short imperative

affects: @atlaskit/util-cz-atlaskit-changelog`;
    const message = transformCommitMessage({ message: commitMessage, hash: 'ABCDEFGHIJKLMNO' });
    expect(message).toBe('* bug fix; short imperative ([ABCDEFG](https://bitbucket.org/atlassian/atlaskit/commits/ABCDEFG))');
  });
  it('includes a basic message with feature', () => {
    const commitMessage = `feat(component): handle feature commit

affects: @atlaskit/util-cz-atlaskit-changelog`;
    const message = transformCommitMessage({ message: commitMessage, hash: 'ABCDEFGHIJKLMNO' });
    expect(message).toBe('* feature; handle feature commit ([ABCDEFG](https://bitbucket.org/atlassian/atlaskit/commits/ABCDEFG))');
  });
  it('includes commit message and breaking change when breaking occurs', () => {
    const commitMessage = `refactor(component): we shall have a breaking change

affects: @atlaskit/util-cz-atlaskit-changelog


BREAKING CHANGE:
Everything borked`;
    const message = transformCommitMessage({ message: commitMessage, hash: 'ABCDEFGHIJKLMNO' });
    expect(message).toBe(`* breaking; Everything borked ([ABCDEFG](https://bitbucket.org/atlassian/atlaskit/commits/ABCDEFG))
* breaking; we shall have a breaking change ([ABCDEFG](https://bitbucket.org/atlassian/atlaskit/commits/ABCDEFG))`);
  });
  it('handles a closed issue', () => {
    const commitMessage = `feat(package): with issue closed

affects: @atlaskit/util-cz-atlaskit-changelog


ISSUES CLOSED: #1234`;
    const message = transformCommitMessage({ message: commitMessage, hash: 'ABCDEFGHIJKLMNO' });
    expect(message).toBe('* feature; with issue closed (issues closed: #1234) ([ABCDEFG](https://bitbucket.org/atlassian/atlaskit/commits/ABCDEFG))');
  });
  it('handles extra text being in the message with a breaking change', () => {
    const commitMessage = `feat(refactor): extra plus breaking

affects: @atlaskit/util-cz-atlaskit-changelog

Here is the extra text
and a second line

BREAKING CHANGE:
things orked`;
    const message = transformCommitMessage({ message: commitMessage, hash: 'ABCDEFGHIJKLMNO' });
    expect(message).toBe(`* breaking; things orked ([ABCDEFG](https://bitbucket.org/atlassian/atlaskit/commits/ABCDEFG))
* breaking; extra plus breaking ([ABCDEFG](https://bitbucket.org/atlassian/atlaskit/commits/ABCDEFG))`);
  });
  it('handles a ":" in the commit message', () => {
    const commitMessage = `feat(component): handle: feature commit

affects: @atlaskit/util-cz-atlaskit-changelog`;
    const message = transformCommitMessage({ message: commitMessage, hash: 'ABCDEFGHIJKLMNO' });
    expect(message).toBe('* feature; handle: feature commit ([ABCDEFG](https://bitbucket.org/atlassian/atlaskit/commits/ABCDEFG))');
  });
});
