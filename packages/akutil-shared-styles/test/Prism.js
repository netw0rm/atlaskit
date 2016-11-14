import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import Prism, {
  SWATCH_TEAL,
  SWATCH_PURPLE,
  InvalidSwatchError,
  InvalidColorError,
} from './_Prism';


chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();

describe('Prism', () => {
  describe('isColor', () => {
    it('should be possible to test whether a variable is actually a color', () => {
      Prism.isColor('akColorSecondary1').should.be.true;
      Prism.isColor('someBla').should.be.false;
      Prism.isColor('akColor').should.be.false;
    });
  });

  describe('getSwatchFromColorName', () => {
    it('should be possible to get a swatch from a color name', () => {
      Prism.getSwatchFromColorName('akColorSecondary1').should.be.equal('Secondary');
      Prism.getSwatchFromColorName('akColorT75').should.be.equal('T');
      Prism.getSwatchFromColorName('akColorN100A').should.be.equal('N');
      expect(() => Prism.getSwatchFromColorName('xyz')).to.throw(InvalidColorError);
      expect(() => Prism.getSwatchFromColorName('akColorBLA200')).to.throw(InvalidSwatchError);
    });
  });

  describe('getColorNumberFromColorName', () => {
    it('should be possible to get a color number from a color name', () => {
      Prism.getColorNumberFromColorName('akColorSecondary1').should.be.equal('1');
      Prism.getColorNumberFromColorName('akColorT75').should.be.equal('75');
      Prism.getColorNumberFromColorName('akColorN100A').should.be.equal('100A');
      expect(() => Prism.getColorNumberFromColorName('xyz')).to.throw(InvalidColorError);
    });
  });

  describe('getNameFromSwatch', () => {
    it('should be possible to get a name from a color swatch', () => {
      Prism.getNameFromSwatch('Primary').should.be.equal('Primary');
      Prism.getNameFromSwatch('Secondary').should.be.equal('Secondary');
      Prism.getNameFromSwatch('N').should.be.equal('Neutral');
      expect(() => Prism.getNameFromSwatch('unknown')).to.throw(InvalidSwatchError);
    });
  });

  describe('getColors', () => {
    it('should be possible to filter out colors from a given less vars object', () => {
      const prism = new Prism({
        bla: 1,
        akColorX: 2,
        akColorY: 3,
        akColourZ: 4,
      });
      Object.keys(prism.getColors()).should.be.deep.equal(['akColorX', 'akColorY']);
    });
  });

  describe('getColorNames', () => {
    it('should be possible to get the name of a color from its value', () => {
      const prism = new Prism({
        akColorX: 2,
        akColorY: 3,
      });
      Object.entries(prism.getColors()).forEach(([name, value]) => {
        prism.getColorNames(value).should.contain(name);
      });
    });
  });

  describe('getColorsBySwatch', () => {
    it('should yell at us if we pass an incorrect swatch', () => {
      expect(() => new Prism({}).getColorsBySwatch('incorrect')).to.throw(InvalidSwatchError);
    });

    it('should be possible to get a filtered color object by swatch', () => {
      const prism = new Prism({
        [`akColor${SWATCH_TEAL}1`]: 1,
        [`akColor${SWATCH_TEAL}2`]: 2,
        [`akColor${SWATCH_TEAL}3`]: 3,
        [`akColor${SWATCH_PURPLE}4`]: 4,
        [`akColor${SWATCH_PURPLE}5`]: 5,
      });

      prism.getColorsBySwatch(SWATCH_TEAL).should.be.deep.equal({
        [`akColor${SWATCH_TEAL}1`]: 1,
        [`akColor${SWATCH_TEAL}2`]: 2,
        [`akColor${SWATCH_TEAL}3`]: 3,
      });
    });
  });

  describe('isTint', () => {
    it('should be possible to detect tints', () => {
      Prism.isTint('akColorR75').should.be.false;
      Prism.isTint('akColorN100').should.be.false;
      Prism.isTint('akColorN100A').should.be.true;
    });
  });
});
