import chai from 'chai';

import typeParser from '../src/typeParser';

const expect = chai.expect;

describe('typeParser', () => {
  describe('typeParser', () => {
    it('returns an empty string if neither name or value attributes present', () => {
      const parsed = typeParser({ foo: 'bar' });
      expect(parsed).to.be.equal('');
    });

    it('returns the type name if there is no value', () => {
      const parsed = typeParser({ name: 'string' });
      expect(parsed).to.equal('string');
    });

    context('when value is a string', () => {
      it('returns the value', () => {
        const parsed = typeParser({ name: 'string', value: 'foobarbaz' });
        expect(parsed).to.equal('foobarbaz');
      });

      it('removes any instance of "PropTypes" in that string', () => {
        const parsed = typeParser({ name: 'string', value: 'PropTypes.shape({name: PropTypes.string})' });
        expect(parsed).to.equal('shape({name: string})');
      });
    });

    context('when name is "arrayOf"', () => {
      it('returns the type, surrounded by square brackets', () => {
        const parsed = typeParser({ name: 'arrayOf', value: { name: 'string' } });
        expect(parsed).to.equal('[ string ]');
      });

      it('deeply parses the inner type', () => {
        const parsed = typeParser({ name: 'arrayOf', value: { name: 'arrayOf', value: { name: 'string' } } });
        expect(parsed).to.equal('[ [ string ] ]');
      });
    });

    context('when value is an array', () => {
      it('returns each element of the array, separated by " | "', () => {
        const parsed = typeParser({ name: 'union', value: [{ name: 'string' }, { name: 'number' }] });
        expect(parsed).to.equal('( string | number )');
      });

      it('deeply parses the inner types', () => {
        const parsed = typeParser({ name: 'union', value: [{ name: 'union', value: [{ name: 'string' }, { name: 'number' }] }, { name: 'number' }] });
        expect(parsed).to.equal('( ( string | number ) | number )');
      });
    });

    context('when value is an object', () => {
      it('reduces over the object mapping keys to types, returning a JSON string', () => {
        const parsed = typeParser({ name: 'shape', value: { foo: { name: 'string' } } });
        expect(parsed).to.equal('{"foo":"string"}');
      });

      it('deeply parses the inner types', () => {
        const parsed = typeParser({ name: 'shape', value: { bar: { name: 'union', value: [{ name: 'string' }, { name: 'number' }] }, foo: { name: 'string' } } });
        expect(parsed).to.equal('{"bar":"( string | number )","foo":"string"}');
      });
    });
  });
});
