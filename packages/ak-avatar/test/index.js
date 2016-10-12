import { waitUntil, getShadowRoot, hasClass } from 'akutil-common-test';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { name } from '../package.json';
import AKAvatar from '../src/index.js';
import shadowStyles from '../src/shadow.less';
import { loading } from '../src/internal/symbols';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

const defaultSize = 'medium';
const defaultPresence = 'none';
const defaultLabel = '';
const oneByOnePixel = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
const avatarSizes = {
  small: 20,
  medium: 30,
  large: 50,
  xlarge: 100,
};
const imgWrapperClass = `.${shadowStyles.locals.imgWrapper}`;
const slotClass = `.${shadowStyles.locals.defaultSlotElement}`;
const loadedClass = shadowStyles.locals.loaded;

// Helper functions for getting various parts of the shadowDOM
const getImgWrapper = component => (getShadowRoot(component).querySelector(imgWrapperClass));
const getSlot = component => (getShadowRoot(component).querySelector(slotClass));
const getImage = component => (getShadowRoot(component).querySelector('img'));

// Helper functions for checking that certain elements are rendered

const imgIsRendered = component => !!getImage(component);

/* Creates a default avatar in a div, appends it to the body and returns a reference to both.
   Appending to the body ensures the component has been redered before we start the test */
function setupAvatar() {
  const component = new AKAvatar();
  const componentHasShadowRoot = () => !!getShadowRoot(component);
  component.src = '';
  document.body.appendChild(component);
  // We return a promise here so we can do more than just the default setting up
  return waitUntil(() => componentHasShadowRoot).then(() => component);
}

function tearDownAvatar(component) {
  document.body.removeChild(component);
}

describe('ak-avatar', () => {
  let component;

  beforeEach(() => setupAvatar().then(newComponent => (component = newComponent)));
  afterEach(() => tearDownAvatar(component));

  it('should be possible to create a component', () => {
    let newComponent;

    expect(() => {
      newComponent = new AKAvatar();
    }).to.not.throw(Error);
    expect(newComponent.tagName).to.match(new RegExp(`^${name}`, 'i'));
  });

  it('should have all the expected default properties after creation', () => {
    const newComponent = new AKAvatar();

    expect(newComponent.size).to.equal(defaultSize, 'size');
    expect(newComponent.presence).to.equal(defaultPresence, 'presence');
    expect(newComponent.label).to.equal(defaultLabel, 'label');
  });

  describe('size property', () => {
    Object.keys(avatarSizes).forEach((size) => {
      it(`should accept all valid values (size = ${size})`, () => {
        const sizeAttributeIsSet = () => (component.getAttribute('size') === size);

        component.size = size;

        return waitUntil(sizeAttributeIsSet).should.be.fulfilled;
      });
    });

    const invalidSizes = ['xxsmall', 'xxlarge', 'big', '', null, undefined];
    invalidSizes.forEach((size) => {
      it(`should be default value when invalid size (${size}) passed`, () => {
        const sizeIsDefaultValue = () => (component.size === defaultSize);

        component.size = size;

        return waitUntil(sizeIsDefaultValue).should.be.fulfilled;
      });
    });

    Object.keys(avatarSizes).forEach((size) => {
      it(`should change the dimensions of the avatar when size=${size}`, () => {
        const rectSizeIsExpected = () => {
          const rect = component.getClientRects()[0];
          const expected = avatarSizes[size];
          return rect.height === expected && rect.height === expected;
        };

        component.size = size;

        return waitUntil(rectSizeIsExpected).should.be.fulfilled;
      });
    });
  });

  describe('label property', () => {
    it('should set an aria-label on the imgWrapper', () => {
      const imgWrapper = getImgWrapper(component);
      const label = 'This is an avatar!';
      const componentHasCorrectLabel = () => (imgWrapper.getAttribute('aria-label') === label);

      component.label = label;

      return waitUntil(componentHasCorrectLabel).should.be.fulfilled;
    });

    it('should set the alt of the internal img', () => {
      const label = 'This is an avatar!';
      const imgHasCorrectLabel = () => (getImage(component).getAttribute('alt') === label);

      // set the src so that we have a rendered img
      component.src = oneByOnePixel;

      return waitUntil(() => imgIsRendered(component)).then(() => {
        component.label = label;

        return waitUntil(imgHasCorrectLabel);
      }).should.be.fulfilled;
    });
  });

  describe('presence property', () => {
    it('should not be visible when set to "none"', () => {
      const presenceIsVisible = () => (getSlot(component).children.length > 0);

      // need to set up the negative case first, so we set presence to online and wait until we
      // have a presence element
      component.presence = 'online';
      return waitUntil(presenceIsVisible).then(() => {
        // now we can check that the presence disappears when we set presence to 'none'
        component.presence = 'none';
        return waitUntil(() => !presenceIsVisible());
      }).should.be.fulfilled;
    });

    it('should be visible when presence is set to \'online\'', () => {
      const presenceIsVisible = () => (getSlot(component).children.length > 0);

      expect(presenceIsVisible()).to.be.false;
      component.presence = 'online';

      return waitUntil(presenceIsVisible).should.be.fulfilled;
    });

    it('should default to none when set to an invalid value', () => {
      const presenceIsVisible = () => (getSlot(component).children.length > 0);

      // set up the negative case again
      component.presence = 'online';
      return waitUntil(presenceIsVisible).then(() => {
        // now we can check that the presence disappears when we set presence to 'none'
        component.presence = 'spooky';
        return waitUntil(() => !presenceIsVisible());
      }).should.be.fulfilled;
    });
  });

  describe('src property', () => {
    it('should set the src property on the internal img', () => {
      const srcPropertyIsSet = () => (getImage(component).src === oneByOnePixel);

      component.src = oneByOnePixel;

      return waitUntil(srcPropertyIsSet).should.be.fulfilled;
    });

    it('should render an img tag when src is set', () => {
      const imgRendered = () => !!getImage(component);

      component.src = oneByOnePixel;

      return waitUntil(imgRendered).should.be.fulfilled;
    });

    it('should not render an img tag when src is not set', () => {
      const imgRendered = () => !!getImage(component);

      // We'll render an image first to make sure that we are actually changing the img and not
      // relying on defaults
      component.src = oneByOnePixel;

      return waitUntil(imgRendered).then(() => {
        // now we can set the src to undefined to see if the image is still rendered.
        component.src = undefined;
        return waitUntil(() => (!imgRendered()));
      }).should.be.fulfilled;
    });
  });

  describe.skip('loading behaviour', () => {
    let imgWrapper;

    beforeEach(() => (imgWrapper = getImgWrapper(component)));

    it('should not apply the .loaded class when loading', () => {
      const loadedClassApplied = () => hasClass(imgWrapper, loadedClass);

      expect(loadedClassApplied()).to.be.true;
      // this would normally be a hidden/internal prop but we can access it here for unit testing
      component[loading] = true;
      return waitUntil(() => !loadedClassApplied()).should.be.fulfilled;
    });

    it('should apply the .loaded class when loading', () => {
      const loadedClassApplied = () => hasClass(imgWrapper, loadedClass);

      // we'll set up the negative case by copying the previous test
      expect(loadedClassApplied()).to.be.true;
      // this would normally be a hidden/internal prop but we can access it here for unit testing
      component[loading] = true;
      return waitUntil(() => !loadedClassApplied())
        .then(() => {
          component[loading] = false;

          return waitUntil(loadedClassApplied);
        }).should.be.fulfilled;
    });
  });
});
