import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import Prism from '../src/Prism';


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
      expect(() => Prism.getSwatchFromColorName('xyz')).to.throw(/not a color/);
    });
  });

  describe('getColorNumberFromColorName', () => {
    it('should be possible to get a color number from a color name', () => {
      Prism.getColorNumberFromColorName('akColorSecondary1').should.be.equal('1');
      Prism.getColorNumberFromColorName('akColorT75').should.be.equal('75');
      Prism.getColorNumberFromColorName('akColorN100A').should.be.equal('100A');
      expect(() => Prism.getColorNumberFromColorName('xyz')).to.throw(/not a color/);
    });
  });

  describe('getNameFromSwatch', () => {
    it('should be possible to get a name from a color swatch', () => {
      Prism.getNameFromSwatch('Primary').should.be.equal('Primary');
      Prism.getNameFromSwatch('Secondary').should.be.equal('Secondary');
      Prism.getNameFromSwatch('N').should.be.equal('Neutral');
      expect(Prism.getNameFromSwatch('unknown')).to.be.null;
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
    it('should be possible to get a filtered color object by swatch', () => {
      const prism = new Prism({
        akColorX1: 1,
        akColorX2: 2,
        akColorX3: 3,
        akColorY4: 4,
        akColorY5: 5,
      });

      prism.getColorsBySwatch('X').should.be.deep.equal({
        akColorX1: 1,
        akColorX2: 2,
        akColorX3: 3,
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
