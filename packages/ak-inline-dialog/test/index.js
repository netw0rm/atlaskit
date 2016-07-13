import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import AkInlineDialog from '../src/index.register.js';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect; // eslint-disable-line no-unused-vars

describe('ak-inline-dialog', () => {
  const inlineDialogContainer = document.createElement('div');
  document.body.appendChild(inlineDialogContainer);

  it('should be possible to create a component', () => {
    const component = new AkInlineDialog();

    expect(component).to.be.defined;
    expect(component.getAttribute('defined')).not.to.equal(null);
  });

  describe('visibility', () => {
    let component;
    beforeEach(() => {
      component = new AkInlineDialog();
      inlineDialogContainer.appendChild(component);
    });

    afterEach(() => {
      inlineDialogContainer.removeChild(component);
    });

    it('should be closed by default', () => {
      expect(component.open).to.equal('false');
      expect(component.getAttribute('open')).not.to.equal('true');
      expect(component.getBoundingClientRect().width).to.equal(0);
      expect(component.getBoundingClientRect().height).to.equal(0);
      expect(component.offsetParent).to.equal(null);
    });

    it('should be open when property \'open\' is set to true', () => {
      component.open = 'true';
      expect(component.getBoundingClientRect().width > 0).to.equal(true);
      expect(component.getBoundingClientRect().height > 0).to.equal(true);
      expect(component.offsetParent).not.to.equal(null);
    });

    it('should be open when attribute \'open\' is set to true', () => {
      component.setAttribute('open', 'true');
      expect(component.getBoundingClientRect().width > 0).to.equal(true);
      expect(component.getBoundingClientRect().height > 0).to.equal(true);
      expect(component.offsetParent).not.to.equal(null);
    });

    it('should be closed when property \'open\' is set to false', () => {
      // should be open first before attempts to close it
      component.open = 'true';

      component.open = 'false';
      expect(component.getBoundingClientRect().width).to.equal(0);
      expect(component.getBoundingClientRect().height).to.equal(0);
      expect(component.offsetParent).to.equal(null);
    });

    it('should be closed when attribute \'open\' is set to false', () => {
      // should be open first before attempts to close it
      component.open = 'true';

      component.setAttribute('open', 'false');
      expect(component.getBoundingClientRect().width).to.equal(0);
      expect(component.getBoundingClientRect().height).to.equal(0);
      expect(component.offsetParent).to.equal(null);
    });

    it('attribute \'open\' and property \'open\' should have the same value', () => {
      component.open = 'true';
      expect(component.open).to.equal('true');
      expect(component.getAttribute('open')).to.equal('true');

      component.open = 'false';
      expect(component.open).to.equal('false');
      expect(component.getAttribute('open')).to.equal('false');
    });
  });
});
