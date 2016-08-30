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

  it('should return true for a known class on a component with single class', () => {
    component.classList.add('foo');

    expect(hasClass(component, 'foo')).to.be.true;
  });

  it('should return true for known class on a component with multiple classes', () => {
    component.classList.add('foo');
    component.classList.add('bar');
    component.classList.add('zee');

    expect(hasClass(component, 'bar')).to.be.true;
  });

  it('should return false for a class not on a component', () => {
    expect(hasClass(component, 'foo')).to.be.false;
  });
});
