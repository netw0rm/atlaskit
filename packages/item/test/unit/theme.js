import { defaultTheme, themeWithKeys, getThemeStyle } from '../../src/util/theme';

import { name } from '../../package.json';

describe(`${name} - theme`, () => {
  const themeWithChildAndParentKeys = { hover: { text: 'purple' } };
  const themeWithParentButNotChild = { hover: { blah: 'purple' } };

  describe('themeWithKeys', () => {
    test('should return default theme if no custom theme supplied', () => {
      expect(themeWithKeys(undefined, 'borderRadius')).toBe(defaultTheme);
      expect(themeWithKeys(undefined, 'text', 'hover')).toBe(defaultTheme);
    });

    test('should return default theme if theme supplied without key', () => {
      expect(themeWithKeys({}, 'borderRadius')).toBe(defaultTheme);
      expect(themeWithKeys({}, 'text', 'hover')).toBe(defaultTheme);
    });

    test('should return default theme if theme supplied parent key but not child key', () => {
      expect(
        themeWithKeys(themeWithParentButNotChild, 'text', 'hover')
      ).toBe(defaultTheme);
    });

    test('should return supplied theme if child key present and no parent key requested', () => {
      const themeWithChildKey = { borderRadius: 10 };
      expect(
        themeWithKeys(themeWithChildKey, 'borderRadius')
      ).toBe(themeWithChildKey);
    });

    test('should return supplied theme if child and parent keys present', () => {
      expect(
        themeWithKeys(themeWithChildAndParentKeys, 'text', 'hover')
      ).toBe(themeWithChildAndParentKeys);
    });
  });

  describe('getThemeStyle', () => {
    test('should return correct value if only child key is requested', () => {
      expect(
        getThemeStyle({ borderRadius: 99 }, 'borderRadius')
      ).toBe(99);
    });

    test('should return correct value if parent and child keys are requested', () => {
      expect(
        getThemeStyle(themeWithChildAndParentKeys, 'text', 'hover')
      ).toBe('purple');
    });

    test('should fall back to default theme value if theme missing key', () => {
      expect(
        getThemeStyle(themeWithParentButNotChild, 'text', 'hover')
      ).toBe(defaultTheme.hover.text);
      expect(
        getThemeStyle({}, 'borderRadius')
      ).toBe(defaultTheme.borderRadius);
    });
  });
});
