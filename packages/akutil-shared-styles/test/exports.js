import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();

import * as lessVars from '../src';

describe('exports', () => {
  it('should have well-defined exports', () => {
    // If you find yourself here and wonder why this list is not auto-generated, then bear in
    // mind that tests are supposed to tell you when a piece of software breaks.
    // As the sole purpose of this component is providing icons:
    //
    // * changing a variable is a patch
    // * adding a variable is a feature
    // * removing a variable is breaking change
    // * renaming a variable is a breaking change
    //
    // If we were to auto-generate this list, then renaming, adding or removing would NOT
    // break any tests and thus not hint the developer at what kind of change he/she is making
    Object.keys(lessVars).should.be.deep.equal([
      'akBorderRadius',
      'akEditorInactiveForeground',
      'akEditorFocus',
      'akEditorSubtleAccent',
      'akEditorActiveBackground',
      'akEditorActiveForeground',
      'akEditorDropdownActiveBackground',
      'akEditorPopupBackground',
      'akEditorPopupText',
      'akEditorPrimaryButton',
      'akColorR50',
      'akColorR100',
      'akColorR200',
      'akColorR300',
      'akColorR400',
      'akColorR500',
      'akColorY50',
      'akColorY100',
      'akColorY200',
      'akColorY300',
      'akColorY400',
      'akColorY500',
      'akColorG50',
      'akColorG100',
      'akColorG200',
      'akColorG300',
      'akColorG400',
      'akColorG500',
      'akColorB50',
      'akColorB100',
      'akColorB200',
      'akColorB300',
      'akColorB400',
      'akColorB500',
      'akColorP50',
      'akColorP100',
      'akColorP200',
      'akColorP300',
      'akColorP400',
      'akColorP500',
      'akColorN10',
      'akColorN20',
      'akColorN30',
      'akColorN40',
      'akColorN50',
      'akColorN60',
      'akColorN70',
      'akColorN80',
      'akColorN90',
      'akColorN100',
      'akColorN200',
      'akColorN300',
      'akColorN400',
      'akColorN500',
      'akColorN600',
      'akColorN700',
      'akColorN800',
      'akColorN900',
      'akFontFamily',
      'akFontSizeDefault',
      'akGridSize',
      'default',
    ]);
  });
});
