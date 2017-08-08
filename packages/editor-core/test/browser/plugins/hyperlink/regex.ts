import { expect } from 'chai';
import { URL_REGEX_PREFIX, URL_REGEX_EXT, EMAIL_REGEX } from '../../../../src/plugins/hyperlink/regex';

describe('hyperlink regex', () => {
  const noise = (url: string) =>
    `some text before ${url} and some more text after`;
  const noiseMatch = (regexp: RegExp, url: string) => (noise(url).match(regexp) as any)[1];

  describe('URL_REGEX_PREFIX', () => {
    it('should match web URLs', () => {
      expect('http://localhost:1988').to.match(URL_REGEX_PREFIX);
      expect('http://www.atlassian.com').to.match(URL_REGEX_PREFIX);
      expect('http://www.atlassian.com/').to.match(URL_REGEX_PREFIX);
      expect('https://atlassian.com').to.match(URL_REGEX_PREFIX);
      expect('https://atlassian.com/').to.match(URL_REGEX_PREFIX);
      expect('www.atlassian.com').to.match(URL_REGEX_PREFIX);
      expect('www.atlassian.com/').to.match(URL_REGEX_PREFIX);
      expect('www.atlassian.com/foo/bar').to.match(URL_REGEX_PREFIX);
      expect('www.atlassian.com:12313/foo/bar').to.match(URL_REGEX_PREFIX);
      expect('www.atlassian.com/foo/bar#foo').to.match(URL_REGEX_PREFIX);
      expect('www.atlassian.com/foo/bar?foo#bar').to.match(URL_REGEX_PREFIX);
    });

    it('should match only the URL_REGEX_PREFIX when surrounded with text', () => {
      expect(noiseMatch(URL_REGEX_PREFIX, 'http://localhost:1988')).to.equal('http://localhost:1988');
      expect(noiseMatch(URL_REGEX_PREFIX, 'http://www.atlassian.com')).to.equal('http://www.atlassian.com');
      expect(noiseMatch(URL_REGEX_PREFIX, 'http://www.atlassian.com/')).to.equal('http://www.atlassian.com/');
      expect(noiseMatch(URL_REGEX_PREFIX, 'https://atlassian.com')).to.equal('https://atlassian.com');
      expect(noiseMatch(URL_REGEX_PREFIX, 'https://atlassian.com/')).to.equal('https://atlassian.com/');
      expect(noiseMatch(URL_REGEX_PREFIX, 'www.atlassian.com')).to.equal('www.atlassian.com');
      expect(noiseMatch(URL_REGEX_PREFIX, 'www.atlassian.com/')).to.equal('www.atlassian.com/');
      expect(noiseMatch(URL_REGEX_PREFIX, 'www.atlassian.com/foo/bar')).to.equal('www.atlassian.com/foo/bar');
      expect(noiseMatch(URL_REGEX_PREFIX, 'www.atlassian.com:12313/foo/bar')).to.equal('www.atlassian.com:12313/foo/bar');
      expect(noiseMatch(URL_REGEX_PREFIX, 'www.atlassian.com/foo/bar#foo')).to.equal('www.atlassian.com/foo/bar#foo');
      expect(noiseMatch(URL_REGEX_PREFIX, 'www.atlassian.com/foo/bar?foo#bar')).to.equal('www.atlassian.com/foo/bar?foo#bar');
    });

    it('should not match non-web schemes', () => {
      expect('app://atlassian.com').to.not.match(URL_REGEX_PREFIX);
      expect('tcp://173.123.21.12').to.not.match(URL_REGEX_PREFIX);
      expect('javascript:alert(1);').to.not.match(URL_REGEX_PREFIX);
    });

    it('should not match special characters', () => {
      const match = (url: string) => (url.match(URL_REGEX_PREFIX) as any)[1];
      expect(match('[www.atlassian.com?hello=there]')).to.equal('www.atlassian.com?hello=there');
      expect(match('(www.atlassian.com#hello>')).to.equal('www.atlassian.com#hello');
      expect(match('(www.atlassian.com/hello<')).to.equal('www.atlassian.com/hello');
      expect(match('(www.atlassian.com/hello?foo=bar^)')).to.equal('www.atlassian.com/hello?foo=bar');
    });
  });

  describe('URL_REGEX_EXT', () => {
    it('should match URLs without www or http, ftp', () => {
      expect('atlassian.net').to.match(URL_REGEX_EXT);
      expect('atlassian.com').to.match(URL_REGEX_EXT);
      expect('atlassian.com:12313/foo/bar').to.match(URL_REGEX_EXT);
    });

    it('should not match invalid', () => {
      expect('atlassian.').to.not.match(URL_REGEX_EXT);
      expect('atlassian').to.not.match(URL_REGEX_EXT);
      expect('.com').to.not.match(URL_REGEX_EXT);
      expect('com').to.not.match(URL_REGEX_EXT);
    });

    it('should not match emails', () => {
      const match = (url: string) => (url.match(URL_REGEX_EXT) as any)[0];
      expect(match('test@atlassian.com')).to.not.equal('test@atlassian.com');
    });

    it('should match predefined domains', () => {
      expect('atlassian.com').to.match(URL_REGEX_EXT);
      expect('atlassian.co').to.match(URL_REGEX_EXT);
      expect('atlassian.net').to.match(URL_REGEX_EXT);
    });

    it('should not match domains not defined', () => {
      expect('atlassian.xxx').to.not.match(URL_REGEX_EXT);
      expect('atlassian.abc').to.not.match(URL_REGEX_EXT);
      expect('atlassian.123').to.not.match(URL_REGEX_EXT);
      expect('www.atlassian.abc').to.not.match(URL_REGEX_EXT);
    });
  });

  describe('EMAIL_REGEX', () => {
    it('should match EMAILs', () => {
      expect('prettyandsimple@example.com').to.match(EMAIL_REGEX);
      expect('very.common@example.com').to.match(EMAIL_REGEX);
      expect('disposable.style.email.with+symbol@example.com').to.match(EMAIL_REGEX);
      expect('other.email-with-dash@example.com').to.match(EMAIL_REGEX);
      expect('x@example.com').to.match(EMAIL_REGEX);
      expect('example-indeed@strange-example.com').to.match(EMAIL_REGEX);
      expect('example@s.solutions').to.match(EMAIL_REGEX);
    });

    it('should not match invalid EMAILs', () => {
      expect('Abc.example.com').to.not.match(EMAIL_REGEX);
      expect('john.doe@example..com').to.not.match(EMAIL_REGEX);
    });

    it('should match only the EMAIL when surrounded with text', () => {
      expect(noiseMatch(EMAIL_REGEX, 'prettyandsimple@example.com')).to.equal('prettyandsimple@example.com');
      expect(noiseMatch(EMAIL_REGEX, 'very.common@example.com')).to.equal('very.common@example.com');
      expect(noiseMatch(EMAIL_REGEX, 'disposable.style.email.with+symbol@example.com')).to.equal('disposable.style.email.with+symbol@example.com');
      expect(noiseMatch(EMAIL_REGEX, 'other.email-with-dash@example.com')).to.equal('other.email-with-dash@example.com');
      expect(noiseMatch(EMAIL_REGEX, 'x@example.com')).to.equal('x@example.com');
      expect(noiseMatch(EMAIL_REGEX, 'example-indeed@strange-example.com')).to.equal('example-indeed@strange-example.com');
      expect(noiseMatch(EMAIL_REGEX, 'example@s.solutions')).to.equal('example@s.solutions');
    });
  });
});
