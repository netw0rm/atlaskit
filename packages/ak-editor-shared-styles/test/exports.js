import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

import * as lessVars from '../src';


chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();

describe('LESS module exports', () => {
  // If you find yourself here and wonder why this list is not auto-generated, then bear in
  // mind that tests are supposed to tell you when a piece of software breaks.
  // As the sole purpose of this component is providing shared style variables:
  //
  // * changing a variable is a patch
  // * adding a variable is a feature
  // * removing a variable is breaking change
  // * renaming a variable is a breaking change
  //
  // If we were to auto-generate this list, then renaming, adding or removing would NOT
  // break any tests and thus not hint the developer at what kind of change he/she is making
  [
    'akEditorCodeFontFamily',
    'akEditorInactiveForeground',
    'akEditorFocus',
    'akEditorSubtleAccent',
    'akEditorActiveBackground',
    'akEditorActiveForeground',
    'akEditorDropdownActiveBackground',
    'akEditorPopupBackground',
    'akEditorPopupText',
    'akEditorPrimaryButton',
    'akEditorCodeBackground',
    'akEditorCodeBlockPadding',
    'akEditorCodeInlinePadding',
  ].forEach((key) => {
    it(`should have an item called "${key}"`, () => {
      expect(lessVars).to.contain.all.keys(key);
    });
  });
});
