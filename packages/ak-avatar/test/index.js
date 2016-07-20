import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { symbols } from 'skatejs';
import { name } from '../package.json';
import AKAvatar from '../src/index.js';
import shadowStyles from '../src/shadow.less';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect; // eslint-disable-line no-unused-vars

const defaultSize = 'medium';
const defaultPresence = 'none';
const defaultDescription = null;
const defaultBorderColor = null;

const avatarSizes = {
  xsmall: 16,
  small: 24,
  medium: 32,
  large: 48,
  xlarge: 64,
};

function setupAvatar() {
  const component = new AKAvatar();
  const container = document.createElement('div');
  component.src = '';
  container.appendChild(component);
  document.body.appendChild(container);

  return [component, container];
}

/* Using this for now so it's easy to swap out once its in akutil-common */
function afterMutation(fn, done) {
  setTimeout(() => {
    fn();
    done();
  }, 1);
}

describe('ak-avatar', () => {
  it('should be possible to create a component', () => {
    let component;
    expect(() => {
      component = new AKAvatar();
    }).to.not.throw(Error);
    expect(component.getAttribute('defined')).not.to.equal(null);
    expect(component.tagName.toLowerCase()).to.equal(name);
  });

  it('should have all the expected default prperties after creation', () => {
    const component = new AKAvatar();

    expect(component.size).to.equal(defaultSize);
    expect(component.presence).to.equal(defaultPresence);
    expect(component.description).to.equal(defaultDescription);
    expect(component.borderColor).to.equal(defaultBorderColor);
  });

  describe('size property', () => {
    let component;
    let container;

    beforeEach(() => {
      [component, container] = setupAvatar(component, container);
    });

    afterEach(() => {
      document.body.removeChild(container);
    });

    it('should accept all valid values', () => {
      Object.keys(avatarSizes).forEach((size) => {
        component.size = size;

        expect(component.size).to.equal(size);
        expect(component.getAttribute('size')).to.equal(size);
      });
    });

    it('should be default value when invalid size passed', () => {
      const invalidSizes = ['xxsmall', 'xxlarge', 'big', '', null, undefined];

      invalidSizes.forEach((size) => {
        component.size = size;

        // We only check the property and not the attribute because setting an attribute to
        // null for example should set the prop to the default value but remove the attribute
        expect(component.size).to.equal(defaultSize);
      });
    });

    Object.keys(avatarSizes).forEach((size) => {
      it(`should change the dimensions of the avatar when size=${size}`, (done) => {
        const borderSize = 1;
        let expected;

        component.size = size;

        afterMutation(() => {
          const rect = component.getClientRects()[0] + 2 * borderSize;
          expect(rect.height).to.equal(expected);
          expect(rect.width).to.equal(expected);
        }, done);
      });
    });
  });

  describe('description property', () => {
    let component;
    let container;

    beforeEach(() => {
      [component, container] = setupAvatar(component, container);
    });

    afterEach(() => {
      document.body.removeChild(container);
    });

    it('should set an aria-label on the outerDiv', (done) => {
      const outerDiv = component[symbols.shadowRoot].firstChild;
      const description = 'This is an avatar!';

      component.description = description;

      afterMutation(() => {
        expect(outerDiv.getAttribute('aria-label')).to.equal(description, 'description');
      }, done);
    });
  });

  describe('presence property', () => {
    let component;
    let container;
    let presence;

    beforeEach(() => {
      [component, container] = setupAvatar(component, container);
      const shadowDOM = component[symbols.shadowRoot].firstChild;
      presence = shadowDOM.querySelector(`.${shadowStyles.locals.presence}`);
    });

    afterEach(() => {
      document.body.removeChild(container);
    });

    it('should not be visible when set to "none"', (done) => {
      component.presence = 'none';

      afterMutation(() => {
        expect(getComputedStyle(presence).display).to.equal('none');
      }, done);
    });

    it('should default to none when set to an invalid value', (done) => {
      component.presence = 'spooky';

      afterMutation(() => {
        expect(getComputedStyle(presence).display).to.equal(defaultPresence);
      }, done);
    });
  });

  describe('src property', () => {
    const oneByOnePixel = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
    let component;
    let container;
    let img;

    beforeEach(() => {
      [component, container] = setupAvatar(component, container);
      img = component[symbols.shadowRoot].firstChild.querySelector('img');
    });

    afterEach(() => {
      document.body.removeChild(container);
    });

    it('should set the src property on the internal img', (done) => {
      component.src = oneByOnePixel;

      afterMutation(() => {
        expect(img.src).to.equal(oneByOnePixel);
      }, done);
    });
  });
});
