import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import rgba from 'rgba-convert';

import * as lessVars from '../src';
import Prism from '../src/Prism';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();

const tintBase = 'akColorN900';

describe('exports', () => {
  it('should have well-defined exports', () => {
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
    Object.keys(lessVars).sort().should.be.deep.equal([
      'akBorderRadius',
      'akCodeFontFamily',
      'akColorB100',
      'akColorB200',
      'akColorB300',
      'akColorB400',
      'akColorB50',
      'akColorB500',
      'akColorB75',
      'akColorG100',
      'akColorG200',
      'akColorG300',
      'akColorG400',
      'akColorG50',
      'akColorG500',
      'akColorG75',
      'akColorN0',
      'akColorN10',
      'akColorN100',
      'akColorN100A',
      'akColorN10A',
      'akColorN20',
      'akColorN200',
      'akColorN200A',
      'akColorN20A',
      'akColorN30',
      'akColorN300',
      'akColorN300A',
      'akColorN30A',
      'akColorN40',
      'akColorN400',
      'akColorN400A',
      'akColorN40A',
      'akColorN50',
      'akColorN500',
      'akColorN500A',
      'akColorN50A',
      'akColorN60',
      'akColorN600',
      'akColorN600A',
      'akColorN60A',
      'akColorN70',
      'akColorN700',
      'akColorN700A',
      'akColorN70A',
      'akColorN80',
      'akColorN800',
      'akColorN800A',
      'akColorN80A',
      'akColorN90',
      'akColorN900',
      'akColorN90A',
      'akColorP100',
      'akColorP200',
      'akColorP300',
      'akColorP400',
      'akColorP50',
      'akColorP500',
      'akColorP75',
      'akColorPrimary1',
      'akColorPrimary2',
      'akColorPrimary3',
      'akColorR100',
      'akColorR200',
      'akColorR300',
      'akColorR400',
      'akColorR50',
      'akColorR500',
      'akColorR75',
      'akColorSecondary1',
      'akColorSecondary2',
      'akColorSecondary3',
      'akColorSecondary4',
      'akColorSecondary5',
      'akColorT100',
      'akColorT200',
      'akColorT300',
      'akColorT400',
      'akColorT50',
      'akColorT500',
      'akColorT75',
      'akColorY100',
      'akColorY200',
      'akColorY300',
      'akColorY400',
      'akColorY50',
      'akColorY500',
      'akColorY75',
      'akFontFamily',
      'akFontSizeDefault',
      'akGridSize',
      'default',
    ]);
  });

  it(`tints should be made of ${tintBase}`, () => {
    const prism = new Prism(lessVars);
    const colors = prism.getColors();
    const neutralBase = rgba(colors[tintBase]).splice(0, 3);
    Object
      .entries(colors)
      .filter(([colorName]) => Prism.isTint(colorName))
      .forEach(([colorName, colorValue]) => {
        rgba(colorValue).splice(0, 3).should.be.deep.equal(
          neutralBase,
          `${colorName} is not a tint of ${tintBase}`
        );
      });
  });
});
