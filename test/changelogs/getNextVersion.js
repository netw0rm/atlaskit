import getNextVersion from '../../build/bin/changelogs/getNextVersion';

describe('getNextVersion()', () => {
  it('should bump a patch version', () => {
    const newVersion = getNextVersion('1.1.1', 'patch');
    expect(newVersion).toBe('1.1.2');
  });
  it('should bump a minor version', () => {
    const newVersion = getNextVersion('1.1.1', 'minor');
    expect(newVersion).toBe('1.2.0');
  });
  it('should bump a major version', () => {
    const newVersion = getNextVersion('1.1.1', 'major');
    expect(newVersion).toBe('2.0.0');
  });
  it('should return null when it cannot read the version', () => {
    const newVersion = getNextVersion('1a.1.1', 'patch');
    expect(newVersion).toBe(null);
  });
  it('should return null when it does not know the change type', () => {
    const newVersion = getNextVersion('1.1.1', 'squid');
    expect(newVersion).toBe(null);
  });
  it('should handle double digit versions', () => {
    const newVersion = getNextVersion('11.1.1', 'patch');
    expect(newVersion).toBe('11.1.2');
  });
});
