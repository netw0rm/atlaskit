import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();

import * as lessVars from '../src';

describe('exports', () => {
  it('should have well-defined exports', () => {
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
