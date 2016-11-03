import assign from 'object-assign';

import { APPEARANCE } from '../src';
import getClasses from '../src/internal/getButtonClasses';


const classKeys = {
  button: 'button',
  compact: 'compact',
  disabled: 'disabled',
  selected: 'selected',
  primary: 'primary',
  subtle: 'subtle',
  link: 'link',
  href: 'href',
};

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
    [
      {
        message: 'standard',
        appearance: APPEARANCE.STANDARD,
      },
      {
        message: 'when invalid appearance provided',
        appearance: 'invalid',
      },
    ].forEach((testCase) => {
      describe(testCase.message, () =>
        it('button should only have .button class', () =>
          expectKeys(
            getClasses(classKeys, { appearance: testCase.appearance }),
            1,
            classKeys.button
          )
        )
      );
    });

    [APPEARANCE.PRIMARY, APPEARANCE.SUBTLE, APPEARANCE.LINK].forEach((appearanceName) => {
      describe(appearanceName, () => {
        let classes;
        beforeEach(() => (classes = getClasses(classKeys, { appearance: appearanceName })));

        it(`button should have ${appearanceName} class`, () =>
          expectKeys(classes, 2, classKeys.button, classKeys[appearanceName])
        );
      });
    });
  });

  describe('compact', () => {
    let classes;
    beforeEach(() => (classes = getClasses(classKeys, { compact: true })));

    it('should include compact class', () =>
      expectKeys(classes, 2, classKeys.button, classKeys.compact)
    );

    describe('when compact attribute is set', () => {
      [
        {
          setup: { disabled: true },
          expectedClass: 'disabled',
        },
        {
          setup: { selected: true },
          expectedClass: 'selected',
        },
        {
          setup: { appearance: APPEARANCE.PRIMARY },
          expectedClass: 'primary',
        },
        {
          setup: { appearance: APPEARANCE.SUBTLE },
          expectedClass: 'subtle',
        },
      ].forEach((testCase) => {
        describe(`and also ${JSON.stringify(testCase.setup)} is set`, () => {
          beforeEach(() => (
            classes = getClasses(classKeys, assign({ compact: true }, testCase.setup))
          ));
          it(`should contain compact and ${testCase.expectedClass} classes`, () =>
            expectKeys(classes, 3,
              classKeys.button,
              classKeys.compact,
              classKeys[testCase.expectedClass]
            )
          );
        });
      });
    });
  });

  describe('href', () => {
    let classes;
    beforeEach(() => (classes = getClasses(classKeys, { href: true })));

    it('classes should include href', () =>
      expectKeys(classes, 2, classKeys.button, classKeys.href)
    );
  });

  describe('selected', () => {
    let classes;
    beforeEach(() => (classes = getClasses(classKeys, { selected: true })));

    it('classes should include selected', () =>
      expectKeys(classes, 2, classKeys.button, classKeys.selected)
    );

    it('selected attribute should override any appearance', () => {
      classes = getClasses(classKeys, { appearance: APPEARANCE.PRIMARY, selected: true });
      expectKeys(classes, 2, classKeys.button, classKeys.selected);
    });
  });

  describe('disabled', () => {
    let classes;
    beforeEach(() => (classes = getClasses(classKeys, { disabled: true })));

    it('classes should include disabled', () =>
      expectKeys(classes, 2, classKeys.button, classKeys.disabled)
    );

    [
      { selected: true },
      { href: 'www.atlassian.com' },
      { appearance: APPEARANCE.PRIMARY },
      { appearance: APPEARANCE.SUBTLE },
    ].forEach(setup =>
      describe(`when also ${setup} is set`, () => {
        beforeEach(() => (classes = getClasses(classKeys, assign(setup, { disabled: true }))));

        it('disabled attribute should discard any other class', () =>
          expectKeys(classes, 2, classKeys.button, classKeys.disabled)
        );
      })
    );

    describe('when attribute appearance link is also set', () => {
      beforeEach(() => (
        classes = getClasses(classKeys, { appearance: APPEARANCE.LINK, disabled: true })
      ));

      it('should have both disabled and link classes', () =>
        expectKeys(classes, 3, classKeys.button, classKeys.disabled, classKeys.link)
      );
    });
  });
});
