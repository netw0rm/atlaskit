import { name } from '../../package.json';
import * as exports from '../../';

describe(name, () => {
  it('named exports', () => {
    expect(exports.privacySafeString).toBeInstanceOf(Function);
    expect(exports.isPrivacySafeString).toBeInstanceOf(Function);
    expect(exports.dangerouslyCreateSafeString).toBeInstanceOf(Function);
    expect(exports.markAsSafe).toBeInstanceOf(Function);
  });

  describe('dangerouslyCreateSafeString', () => {
    const { dangerouslyCreateSafeString, privacySafeString } = exports;
    it('should have the same implementation as isPrivacySafeString', () => {
      expect(dangerouslyCreateSafeString).toBe(privacySafeString);
    });
  });

  describe('isPrivacySafeString', () => {
    const { isPrivacySafeString } = exports;

    it('should return false for non-safe objects', () => {
      expect(isPrivacySafeString(null)).toBe(false);
      expect(isPrivacySafeString({})).toBe(false);
      expect(isPrivacySafeString(undefined)).toBe(false);
      expect(isPrivacySafeString(1)).toBe(false);
    });

    it('should return false for a string', () => {
      const STRING_EXAMPLE = 'foo';
      expect(isPrivacySafeString(STRING_EXAMPLE)).toBe(false);
    });
  });

  describe('privacySafeString', () => {
    const { privacySafeString, isPrivacySafeString } = exports;

    it('is marked as safe and have the same value', () => {
      const STRING_EXAMPLE = 'foo';
      const safeString = privacySafeString(STRING_EXAMPLE);
      expect(isPrivacySafeString(safeString)).toBe(true);
      expect(safeString.value).toBe(STRING_EXAMPLE);
    });

    it('instantiated with non-strings, should be marked as unsafe', () => {
      expect(isPrivacySafeString(privacySafeString(null))).toBe(false);
      expect(isPrivacySafeString(privacySafeString({}))).toBe(false);
      expect(isPrivacySafeString(privacySafeString(undefined))).toBe(false);
      expect(isPrivacySafeString(privacySafeString(1))).toBe(false);
    });

    it('should not allow you to change the value property', () => {
      const STRING_EXAMPLE = 'foo';
      const safeString = privacySafeString(STRING_EXAMPLE);
      safeString.value = 'bar';
      expect(safeString.value).toBe(STRING_EXAMPLE);
    });

    it('should not allow you to change the isPrivacySafeString property', () => {
      const safeString = privacySafeString(null);
      expect(isPrivacySafeString(safeString)).toBe(false);
      safeString.isPrivacySafeString = true;
      expect(isPrivacySafeString(safeString)).toBe(false);
    });

    it('should return the same object if a safe string is supplied', () => {
      const safeString = privacySafeString('foo');
      expect(safeString).toBeInstanceOf(Object);
      expect(privacySafeString(safeString)).toBe(safeString);
    });
  });

  describe('markAsSafe', () => {
    const { markAsSafe, isPrivacySafeString } = exports;
    it('should return a privacy safe string if the value is allowed', () => {
      const safeString = markAsSafe('foo', 'bar')('foo');
      expect(safeString.value).toBe('foo');
      expect(isPrivacySafeString(safeString)).toBe(true);
    });

    it('should not return a privacy safe string if the value isnt allowed', () => {
      expect(isPrivacySafeString(markAsSafe('foo')('bar'))).toBe(false);
    });

    it('should not return a privacy safe string if there are no allowed values', () => {
      expect(isPrivacySafeString(markAsSafe()('foo'))).toBe(false);
    });
  });
});
