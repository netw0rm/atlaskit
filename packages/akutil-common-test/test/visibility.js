import { checkVisibility, checkInvisibility } from '../src';
import chai from 'chai';
import sinonChai from 'sinon-chai';
chai.should();
chai.use(sinonChai);

describe('visible elements', () => {
  let div;

  beforeEach(() => {
    div = document.createElement('div');
    div.setAttribute('style', 'display: block; width: 50px; height: 50px;');
    document.body.appendChild(div);
  });

  afterEach(() => {
    document.body.removeChild(div);
  });

  it('checkVisibility returns true', () => {
    expect(checkVisibility(div)).to.equal(true);
  });

  it('checkInvisibility returns false', () => {
    expect(checkInvisibility(div)).to.equal(false);
  });
});
describe('invisible elements', () => {
  let div;

  beforeEach(() => {
    div = document.createElement('div');
    div.setAttribute('style', 'display: none;');
    document.body.appendChild(div);
  });

  it('checkVisibility returns false', () => {
    expect(checkVisibility(div)).to.equal(false);
  });

  it('checkInvisibility returns true', () => {
    expect(checkInvisibility(div)).to.equal(true);
  });
});
