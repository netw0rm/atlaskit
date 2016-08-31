import { hasClass } from '../src';
import chai from 'chai';
import sinonChai from 'sinon-chai';
chai.should();
chai.use(sinonChai);


describe('hasClass', () => {
  let component;
  beforeEach(() => {
    component = document.createElement('div');
    document.body.appendChild(component);
  });
  afterEach(() => {
    document.body.removeChild(component);
  });

  it('should return false with no arguments at all', () => {
    expect(hasClass()).to.be.false;
    expect(hasClass(false)).to.be.false;
    expect(hasClass(null)).to.be.false;
  });

  it('should return false if first argument is not a DOM Element', () => {
    expect(hasClass({})).to.be.false;
    expect(hasClass([])).to.be.false;
    expect(hasClass('')).to.be.false;
    expect(hasClass(1)).to.be.false;
  });

  describe('when component has no class', () => {
    it('should return true if no class provided', () =>
      expect(hasClass(component)).to.be.true
    );

    it('should return false for any class provided', () =>
      expect(hasClass(component, 'foo')).to.be.false
    );
  });

  describe('when component has one class', () => {
    beforeEach(() => component.classList.add('foo'));

    it('should return true if no class provided', () =>
      expect(hasClass(component)).to.be.true
    );

    it('should return true for a known class', () =>
      expect(hasClass(component, 'foo')).to.be.true
    );

    it('should return false for an unknown class', () =>
      expect(hasClass(component, 'test')).to.be.false
    );
  });

  describe('when component has multiple classes', () => {
    beforeEach(() =>
      ['foo', 'bar', 'zee'].forEach(className =>
        component.classList.add(className)
      )
    );

    it('should return true for known class', () =>
      expect(hasClass(component, 'bar')).to.be.true
    );

    it('should return true for multiple known classes', () =>
      expect(hasClass(component, 'bar', 'foo', 'zee')).to.be.true
    );

    it('should return false for unknown classes', () =>
      expect(hasClass(component, 'bar', 'foo', 'wat')).to.be.false
    );
  });
});
