import { waitUntil } from 'akutil-common-test';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { symbols } from 'skatejs';
import { name } from '../package.json';
import AKAvatar from '../src/index.js';
import shadowStyles from '../src/shadow.less';

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
const presenceClass = `.${shadowStyles.locals.presence}`;
const imgWrapperClass = `.${shadowStyles.locals.imgWrapper}`;

let component;
let container;

// Helper functions for getting various parts of the shadowDOM
const getShadowRoot = () => (component[symbols.shadowRoot]);
const getImgWrapper = () => (getShadowRoot().querySelector(imgWrapperClass));
const getPresence = () => (getShadowRoot().querySelector(presenceClass));
const getImage = () => (getShadowRoot().querySelector('img'));

// Helper functions for checking that certain elements are rendered
const componentHasShadowRoot = () => (getShadowRoot() !== null);
const imgIsRendered = () => (getImage() !== null);

/* Creates a default avatar in a div, appends it to the body and returns a reference to both.
   Appending to the body ensures the component has been redered before we start the test */
function setupAvatar(done) {
  component = new AKAvatar();
  container = document.createElement('div');
  component.src = '';
  container.appendChild(component);
  document.body.appendChild(container);
  waitUntil(componentHasShadowRoot).then(() => {
    done();
  });
}

function tearDownAvatar() {
  document.body.removeChild(container);
}

describe('ak-avatar', () => {
  it('should be possible to create a component', () => {
    expect(() => {
      component = new AKAvatar();
    }).to.not.throw(Error);
    expect(component.tagName).to.match(new RegExp(`^${name}`, 'i'));
  });

  it('should have all the expected default properties after creation', () => {
    component = new AKAvatar();

    expect(component.size).to.equal(defaultSize, 'size');
    expect(component.presence).to.equal(defaultPresence, 'presence');
    expect(component.label).to.equal(defaultLabel, 'label');
  });

  describe('size property', () => {
    beforeEach(setupAvatar);
    afterEach(tearDownAvatar);

    Object.keys(avatarSizes).forEach((size) => {
      it(`should accept all valid values (size = ${size})`, (done) => {
        const sizeAttributeIsSet = () => (component.getAttribute('size') === size);

        component.size = size;

        waitUntil(sizeAttributeIsSet).then(() => {
          expect(component.size).to.equal(size);
          expect(sizeAttributeIsSet()).to.equal(true);
          done();
        });
      });
    });

    const invalidSizes = ['xxsmall', 'xxlarge', 'big', '', null, undefined];
    invalidSizes.forEach((size) => {
      it(`should be default value when invalid size (${size}) passed`, (done) => {
        const sizeIsDefaultValue = () => (component.size === defaultSize);

        component.size = size;

        waitUntil(sizeIsDefaultValue).then(() => {
          expect(sizeIsDefaultValue()).to.be.true;
          done();
        });
      });
    });

    Object.keys(avatarSizes).forEach((size) => {
      it(`should change the dimensions of the avatar when size=${size}`, (done) => {
        const rectSizeIsExpected = () => {
          const rect = component.getClientRects()[0];
          const expected = avatarSizes[size];
          return rect.height === expected && rect.height === expected;
        };

        component.size = size;

        waitUntil(rectSizeIsExpected).then(() => {
          expect((rectSizeIsExpected)()).to.be.true;
          done();
        });
      });
    });
  });

  describe('label property', () => {
    beforeEach(setupAvatar);
    afterEach(tearDownAvatar);

    it('should set an aria-label on the imgWrapper', (done) => {
      const imgWrapper = getImgWrapper();
      const label = 'This is an avatar!';
      const componentHasCorrectLabel = () => (imgWrapper.getAttribute('aria-label') === label);

      component.label = label;

      waitUntil(componentHasCorrectLabel).then(() => {
        expect(componentHasCorrectLabel()).to.be.true;
        done();
      });
    });

    it('should set the alt of the internal img', (done) => {
      let img;
      const label = 'This is an avatar!';
      const imgHasCorrectLabel = () => (img.getAttribute('alt') === label);

      // set the src so that we have a rendered img
      component.src = oneByOnePixel;

      waitUntil(imgIsRendered).then(() => {
        img = getImage();

        component.label = label;

        return waitUntil(imgHasCorrectLabel);
      }).then(() => {
        expect(imgHasCorrectLabel()).to.be.true;
        done();
      });
    });
  });

  describe('presence property', () => {
    beforeEach(setupAvatar);
    afterEach(tearDownAvatar);

    it('should not be visible when set to "none"', (done) => {
      const presence = getPresence();
      const presenceIsNotVisible = () => (getComputedStyle(presence).display === 'none');

      component.presence = 'none';

      waitUntil(presenceIsNotVisible).then(() => {
        expect((presenceIsNotVisible)()).to.be.true;
        done();
      });
    });

    it('should be visible when presence is set to \'online\'', (done) => {
      const presence = getPresence();
      const presenceIsVisible = () => (getComputedStyle(presence).display !== 'none');

      component.presence = 'online';

      waitUntil(presenceIsVisible).then(() => {
        expect(presenceIsVisible()).to.be.true;
        done();
      });
    });

    it('should default to none when set to an invalid value', (done) => {
      const presence = getPresence();
      const presenceIsNotVisible = () => (getComputedStyle(presence).display === 'none');

      component.presence = 'spooky';

      waitUntil(presenceIsNotVisible).then(() => {
        expect(presenceIsNotVisible()).to.be.true;
        done();
      });
    });
  });

  describe('src property', () => {
    const loadedClass = shadowStyles.locals.loaded;
    beforeEach(setupAvatar);
    afterEach(tearDownAvatar);

    it('should set the src property on the internal img', (done) => {
      const srcPropertyIsSet = () => (getImage().src === oneByOnePixel);

      component.src = oneByOnePixel;

      waitUntil(srcPropertyIsSet).then(() => {
        expect(srcPropertyIsSet()).to.be.true;
        done();
      });
    });

    it('should not add the .loaded class if img fails to load', done => {
      const invalidSrc = 'notavalidURL';
      const hasLoadedClass = () => (Array.prototype.slice.call(getImgWrapper().classList).indexOf(loadedClass) > -1); // eslint-disable-line max-len

      // we'll load an image first so that we can be sure we arent just seeing default behaviour
      component.src = oneByOnePixel;

      waitUntil(hasLoadedClass).then(() => {
        // now we set the src to something invalid
        component.src = invalidSrc;
        // waitUntil we no longer have the loaded class
        return waitUntil(() => (!hasLoadedClass()));
      }).then(() => {
        expect(hasLoadedClass()).to.be.false;
        done();
      });
    });

    it('should add the .loaded class if img loads successfully', done => {
      const imgWrapper = getImgWrapper();
      const hasLoadedClass = () => (Array.prototype.slice.call(imgWrapper.classList).indexOf(loadedClass) > -1); // eslint-disable-line max-len

      component.src = oneByOnePixel;

      waitUntil(hasLoadedClass).then(() => {
        expect(hasLoadedClass()).to.be.true;
        done();
      });
    });

    it('should render an img tag when src is set', done => {
      const imgRendered = () => (getImage() !== null);

      component.src = oneByOnePixel;

      waitUntil(imgRendered).then(() => {
        expect(imgRendered()).to.be.true;
        done();
      });
    });

    it('should not render an img tag when src is not set', (done) => {
      const imgRendered = () => (getImage() !== null);

      // We'll render an image first to make sure that we are actually changing the img and not
      // relying on defaults
      component.src = oneByOnePixel;

      waitUntil(imgRendered).then(() => {
        // now we can set the src to undefined to see if the image is still rendered.
        component.src = undefined;
        return waitUntil(() => (!imgRendered()));
      }).then(() => {
        expect(imgRendered()).to.be.false;
        done();
      });
    });
  });

  describe('loading behaviour', () => {
    let imgWrapper;
    const loadedClass = shadowStyles.locals.loaded;
    const imgWrapperRendered = () => {
      imgWrapper = getImgWrapper();
      return imgWrapper !== null;
    };

    beforeEach((done) => {
      setupAvatar(() => {
        component.src = oneByOnePixel;
        waitUntil(imgWrapperRendered).then(() => {
          expect(imgWrapperRendered()).to.be.true;
          done();
        });
      });
    });

    afterEach(() => {
      tearDownAvatar(container);
    });

    it('should show the image if __loading is false', (done) => {
      const imgShown = () => (Array.prototype.slice.call(imgWrapper.classList).indexOf(loadedClass) > -1); // eslint-disable-line max-len

      component.__loading = false; // eslint-disable-line no-underscore-dangle

      waitUntil(imgShown).then(() => {
        expect(imgShown()).to.be.true;
        done();
      });
    });

    it('should not show the image if __loading is true', (done) => {
      const imgHidden = () => (Array.prototype.slice.call(imgWrapper.classList).indexOf(loadedClass) > -1); // eslint-disable-line max-len

      component.__loading = true; // eslint-disable-line no-underscore-dangle

      waitUntil(imgHidden).then(() => {
        expect(imgHidden()).to.be.true;
        done();
      });
    });
  });
});
