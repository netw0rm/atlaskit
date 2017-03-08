import { expect } from 'chai';
import { URL_REGEX } from '../../../src/plugins/inputrules/input-future';

// TODO move to innputrules test
describe('hyperlink regex', () => {
  it('should match web URLs', () => {
    expect('http://localhost:1988').to.match(URL_REGEX);
    expect('http://www.atlassian.com').to.match(URL_REGEX);
    expect('http://www.atlassian.com/').to.match(URL_REGEX);
    expect('https://atlassian.com').to.match(URL_REGEX);
    expect('https://atlassian.com/').to.match(URL_REGEX);
    expect('www.atlassian.com').to.match(URL_REGEX);
    expect('www.atlassian.com/').to.match(URL_REGEX);
    expect('www.atlassian.com/foo/bar').to.match(URL_REGEX);
    expect('www.atlassian.com:12313/foo/bar').to.match(URL_REGEX);
    expect('www.atlassian.com/foo/bar#foo').to.match(URL_REGEX);
    expect('www.atlassian.com/foo/bar?foo#bar').to.match(URL_REGEX);
  });

  it('should match only the URL_REGEX when surrounded with text', () => {
    const noise = (url: string) =>
      `some text before ${url} and some more text after`;
    const noiseMatch = (url: string) => (noise(url).match(URL_REGEX) as any)[1];

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
    expect('app://atlassian.com').to.not.match(URL_REGEX);
    expect('tcp://173.123.21.12').to.not.match(URL_REGEX);
    expect('javascript:alert(1);').to.not.match(URL_REGEX);
  });

  it('should not match special characters', () => {
    const match = (url: string) => (url.match(URL_REGEX) as any)[1];
    expect(match('[www.atlassian.com?hello=there]')).to.equal('www.atlassian.com?hello=there');
    expect(match('(www.atlassian.com#hello)')).to.equal('www.atlassian.com#hello');
    expect(match('(www.atlassian.com/hello)')).to.equal('www.atlassian.com/hello');
    expect(match('(www.atlassian.com/hello?foo=bar^)')).to.equal('www.atlassian.com/hello?foo=bar');
  });
});
