import { URL } from '../src/regex';
import { expect } from 'chai';

describe('ak-editor-plugin-hyperlink regex', () => {
  it('should match web URLs', () => {
    expect('http://localhost:1988').to.match(URL);
    expect('http://www.atlassian.com').to.match(URL);
    expect('http://www.atlassian.com/').to.match(URL);
    expect('https://atlassian.com').to.match(URL);
    expect('https://atlassian.com/').to.match(URL);
    expect('www.atlassian.com').to.match(URL);
    expect('www.atlassian.com/').to.match(URL);
    expect('www.atlassian.com/foo/bar').to.match(URL);
    expect('www.atlassian.com:12313/foo/bar').to.match(URL);
    expect('www.atlassian.com/foo/bar#foo').to.match(URL);
    expect('www.atlassian.com/foo/bar?foo#bar').to.match(URL);
  });

  it('should match only the URL when surrounded with text', () => {
    const noise = (url: string) =>
      `some text before ${url} and some more text after`;
    const noiseMatch = (url: string) => (noise(url).match(URL) as any)[1];

    expect(noiseMatch('http://localhost:1988')).to.equal('http://localhost:1988');
    expect(noiseMatch('http://www.atlassian.com')).to.equal('http://www.atlassian.com');
    expect(noiseMatch('http://www.atlassian.com/')).to.equal('http://www.atlassian.com/');
    expect(noiseMatch('https://atlassian.com')).to.equal('https://atlassian.com');
    expect(noiseMatch('https://atlassian.com/')).to.equal('https://atlassian.com/');
    expect(noiseMatch('www.atlassian.com')).to.equal('www.atlassian.com');
    expect(noiseMatch('www.atlassian.com/')).to.equal('www.atlassian.com/');
    expect(noiseMatch('www.atlassian.com/foo/bar')).to.equal('www.atlassian.com/foo/bar');
    expect(noiseMatch('www.atlassian.com:12313/foo/bar')).to.equal('www.atlassian.com:12313/foo/bar');
    expect(noiseMatch('www.atlassian.com/foo/bar#foo')).to.equal('www.atlassian.com/foo/bar#foo');
    expect(noiseMatch('www.atlassian.com/foo/bar?foo#bar')).to.equal('www.atlassian.com/foo/bar?foo#bar');
  });

  it('should not match non-web schemes', () => {
    expect('app://atlassian.com').to.not.match(URL);
    expect('tcp://173.123.21.12').to.not.match(URL);
    expect('javascript:alert(1);').to.not.match(URL);
  });
});
