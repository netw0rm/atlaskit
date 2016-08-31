import locateWebComponent from '../src/index.locateWebComponent';
import Avatar from 'ak-avatar';
import chai from 'chai';
import sinonChai from 'sinon-chai';
chai.should();
chai.use(sinonChai);

describe('locateWebComponent', () => {
  let component;
  beforeEach((done) => {
    component = new Avatar();
    document.body.appendChild(component);
    setTimeout(done);
  });
  afterEach(() => {
    document.body.removeChild(component);
  });

  it('should be possible to locate a webcomponent by its name', () => {
    locateWebComponent('ak-avatar').should.be.deep.equal([component]);
    locateWebComponent('not-existent').should.be.deep.equal([]);
  });

  it('should be possible to locate a webcomponent by its prefix', () => {
    locateWebComponent('ak-av').should.be.deep.equal([component]);
  });

  it('should be possible to locate a webcomponent by its prefix in a given parent element', () => {
    locateWebComponent('ak-avatar', document.body).should.be.deep.equal([component]);
    const div = document.createElement('div');
    document.body.appendChild(div);
    locateWebComponent('ak-avatar', div).should.be.deep.equal([]);
    document.body.removeChild(div);
  });
});
