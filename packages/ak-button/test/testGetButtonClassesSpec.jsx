import { appearance, spacing } from '../src/internal/enumerated-properties';
import getClasses from '../src/internal/get-button-classes';

const classKeys = {
  button: 'button',
  appearanceDefault: 'appearanceDefault',
  appearancePrimary: 'appearancePrimary',
  appearanceSubtle: 'appearanceSubtle',
  appearanceLink: 'appearanceLink',
  appearanceSubtleLink: 'appearanceSubtleLink',
  spacingCompact: 'spacingCompact',
  spacingNone: 'spacingNone',
  spacingDefault: 'spacingDefault',
  disabled: 'disabled',
  selected: 'selected',
  href: 'href',
  themeDefault: 'themeDefault',
  themeDark: 'themeDark',
};

const hyphenLowerToUpper = s => s[1].toUpperCase(); // Replaces /-[a-z]/ with the uppercase char.
const capitalize = s => (s[0].toUpperCase() + s.slice(1)).replace(/-[a-z]/g, hyphenLowerToUpper);

const expectKeys = (classes, expectedCount, ...expectedClasses) => {
  const filteredClasses = Object.entries(classes).reduce((acum, [key, value]) => {
    if (value) {
      acum.push(key);
    }
    return acum;
  }, []);
  expect(filteredClasses)
    .to.have.lengthOf(expectedCount)
    .and.to.include.members(expectedClasses);
};

describe('ak-button/get-button-classes', () => {
  describe('appearance', () => {
    it('button should only have default classes', () =>
      expectKeys(
        getClasses(classKeys, { appearance: appearance.default }),
        2,
        classKeys.button,
        classKeys.appearanceDefault
      )
    );

    [
      'primary',
      'subtle',
      'link',
      'subtle-link',
    ].forEach((appearanceName) => {
      describe(appearanceName, () => {
        let classes;
        beforeEach(() => (classes = getClasses(classKeys, { appearance: appearanceName })));

        it(`button should have ${appearanceName} class`, () =>
          expectKeys(classes, 2, classKeys.button,
classKeys[`appearance${capitalize(appearanceName)}`])
        );
      });
    });
  });

  describe('spacing', () => {
    let classes;

    describe('normal', () => {
      beforeEach(() => (classes = getClasses(classKeys, { spacing: spacing.default })));

      it('should not set any class', () =>
        expectKeys(classes, 1, classKeys.button)
      );
    });

    ['compact', 'none'].forEach((name) => {
      describe(name, () => {
        beforeEach(() => (classes = getClasses(classKeys, { spacing: name })));

        it(`should include class ${classKeys[name]}`, () =>
          expectKeys(classes, 2, classKeys.button, classKeys[`spacing${capitalize(name)}`])
        );

        describe(`when spacing=${name} attribute is set`, () => {
          [
            {
              setup: { isDisabled: true },
              expectedClass: 'disabled',
            },
            {
              setup: { isSelected: true },
              expectedClass: 'selected',
            },
            {
              setup: { appearance: 'primary' },
              expectedClass: 'appearancePrimary',
            },
            {
              setup: { appearance: 'subtle' },
              expectedClass: 'appearanceSubtle',
            },
          ].forEach((testCase) => {
            describe(`and also ${JSON.stringify(testCase.setup)} is set`, () => {
              beforeEach(() => (
                classes = getClasses(classKeys, { spacing: name, ...testCase.setup })
              ));
              it(`should also contain ${testCase.expectedClass} class`, () =>
                expectKeys(classes, 3,
                  classKeys.button,
                  classKeys[`spacing${capitalize(name)}`],
                  classKeys[testCase.expectedClass]
                )
              );
            });
          });
        });
      });
    });
  });

  describe('selected', () => {
    let classes;
    beforeEach(() => (classes = getClasses(classKeys, { isSelected: true })));

    it('classes should include selected', () =>
      expectKeys(classes, 2, classKeys.button, classKeys.selected)
    );

    it('selected attribute should override any appearance', () => {
      classes = getClasses(classKeys, { appearance: 'primary', isSelected: true });
      expectKeys(classes, 2, classKeys.button, classKeys.selected);
    });
  });

  describe('disabled', () => {
    let classes;
    beforeEach(() => (classes = getClasses(classKeys, { isDisabled: true })));

    it('classes should include disabled', () =>
      expectKeys(classes, 2, classKeys.button, classKeys.disabled)
    );

    [
      { isSelected: true },
      { href: 'www.atlassian.com' },
      { appearance: 'subtle' },
    ].forEach(setup =>
      describe(`when also ${setup} is set`, () => {
        beforeEach(() =>
          (classes = getClasses(classKeys, Object.assign(setup, { isDisabled: true }))));

        it('disabled attribute should discard any other class', () =>
          expectKeys(classes, 2, classKeys.button, classKeys.disabled)
        );
      })
    );

    [
      'link',
      'subtle-link',
      'primary',
    ].forEach(a =>
      describe(`when attribute appearance ${a} is also set`, () => {
        beforeEach(() => (
          classes = getClasses(classKeys, { appearance: a, isDisabled: true })
        ));

        it('should have both disabled and link classes', () =>
          expectKeys(classes, 3,
            classKeys.button,
            classKeys.disabled,
            classKeys[`appearance${capitalize(a)}`])
        );
      })
    );
  });
});
