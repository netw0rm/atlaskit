import * as mocha from 'mocha';
import { expect } from 'chai';
import * as lessVars from '../src';


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

  it('should have well-defined exports', () => {
    expect(Object.keys(lessVars)).to.include.members([
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
      'default',
    ]);
  });
});
