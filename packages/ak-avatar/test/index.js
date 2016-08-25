import { afterMutations } from 'akutil-common-test';
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

/* Creates a default avatar in a div, appends it to the body and returns a reference to both.
   Appending to the body ensures the component has been redered before we start the test */
function setupAvatar() {
  const component = new AKAvatar();
  const container = document.createElement('div');
  component.src = '';
  container.appendChild(component);
  document.body.appendChild(container);

  return [component, container];
}

function tearDownAvatar(container) {
  document.body.removeChild(container);
}


describe('ak-avatar', () => {
  it('should be possible to create a component', () => {
    let component;
    expect(() => {
      component = new AKAvatar();
    }).to.not.throw(Error);
    expect(component.tagName).to.match(new RegExp(`^${name}`, 'i'));
  });

  it('should have all the expected default properties after creation', () => {
    const component = new AKAvatar();

    expect(component.size).to.equal(defaultSize, 'size');
    expect(component.presence).to.equal(defaultPresence, 'presence');
    expect(component.label).to.equal(defaultLabel, 'label');
  });

  describe('size property', () => {
    let component;
    let container;

    beforeEach(() => ([component, container] = setupAvatar(component, container)));
    afterEach(() => (tearDownAvatar(container)));

    Object.keys(avatarSizes).forEach((size) => {
      it('should accept all valid values (size = ${size})', (done) => {
        afterMutations(
          () => (component.size = size),
          () => {
            expect(component.size).to.equal(size);
            expect(component.getAttribute('size')).to.equal(size);
          },
          done
        );
      });
    });

    const invalidSizes = ['xxsmall', 'xxlarge', 'big', '', null, undefined];
    invalidSizes.forEach((size) => {
      it('should be default value when invalid size passed', (done) => {
        afterMutations(
          () => (component.size = size),
          // We only check the property and not the attribute because setting an attribute to
          // null for example should set the prop to the default value but remove the attribute
          () => expect(component.size).to.equal(defaultSize),
          done
        );
      });
    });

    Object.keys(avatarSizes).forEach((size) => {
      it(`should change the dimensions of the avatar when size=${size}`, (done) => {
        let expected;

        afterMutations(
          () => (component.size = size),
          () => {
            const rect = component.getClientRects()[0];
            expected = avatarSizes[size];
            expect(rect.height).to.equal(expected);
            expect(rect.width).to.equal(expected);
          },
          done
        );
      });
    });
  });

  describe('label property', () => {
    let component;
    let container;

    beforeEach((done) => {
      afterMutations(
        () => ([component, container] = setupAvatar(component, container)),
        done
      );
    });

    afterEach(() => {
      tearDownAvatar(container);
    });

    it('should set an aria-label on the imgWrapper', (done) => {
      const outerDiv = component[symbols.shadowRoot].querySelector(`.${shadowStyles.locals.imgWrapper}`); // eslint-disable-line  max-len
      const label = 'This is an avatar!';

      afterMutations(
        () => (component.label = label),
        () => expect(outerDiv.getAttribute('aria-label')).to.equal(label, 'label'),
        done
      );
    });

    it('should set the alt of the internal img', (done) => {
      let img;
      const label = 'This is an avatar!';

      afterMutations(
        () => {
          // set the src so that we have an img and not just initials
          component.src = oneByOnePixel;
          component.label = label;
        },
        () => (img = component[symbols.shadowRoot].querySelector('img')),
        () => expect(img.getAttribute('alt')).to.equal(label),
        done);
    });
  });

  describe('presence property', () => {
    let component;
    let container;
    let presence;

    beforeEach((done) => {
      afterMutations(
        () => ([component, container] = setupAvatar(component, container)),
        () => {
          const shadowDOM = component[symbols.shadowRoot];
          presence = shadowDOM.querySelector(`.${shadowStyles.locals.presence}`);
        },
        done
      );
    });

    afterEach(() => {
      tearDownAvatar(container);
    });

    it('should not be visible when set to "none"', (done) => {
      afterMutations(
        () => (component.presence = 'none'),
        () => expect(getComputedStyle(presence).display).to.equal('none'),
        done
      );
    });

    it('should be visible when presence is set to \'online\'', (done) => {
      afterMutations(
        () => (component.presence = 'online'),
        () => expect(getComputedStyle(presence).display).to.not.equal('none'),
        done
      );
    });

    it('should default to none when set to an invalid value', (done) => {
      afterMutations(
        () => (component.presence = 'spooky'),
        () => expect(getComputedStyle(presence).display).to.equal(defaultPresence),
        done
      );
    });
  });

  describe('src property', () => {
    let component;
    let container;

    beforeEach(() => ([component, container] = setupAvatar(component, container)));
    afterEach(() => (tearDownAvatar(container)));

    it('should set the src property on the internal img', (done) => {
      afterMutations(
        () => (component.src = oneByOnePixel),
        () => {
          const img = component[symbols.shadowRoot].querySelector('img');
          expect(img.src).to.equal(oneByOnePixel);
        },
        done
      );
    });

    it('should not add the .loaded class if img fails to load', done => {
      afterMutations(
        () => (component.src = 'notavalidURL'),
        () => {
          const imgWrapper = component[symbols.shadowRoot].querySelector(`.${shadowStyles.locals.imgWrapper}`); // eslint-disable-line  max-len
          const hasLoadedClass = Array.prototype.slice.call(imgWrapper.classList).indexOf(shadowStyles.locals.loaded) > -1; // eslint-disable-line max-len
          expect(hasLoadedClass).to.equal(false);
        },
        done
      );
    });

    it('should add the .loaded class if img loads successfully', done => {
      afterMutations(
        () => (component.src = oneByOnePixel),
        () => {
          const imgWrapper = component[symbols.shadowRoot].querySelector(`.${shadowStyles.locals.imgWrapper}`); // eslint-disable-line  max-len
          const hasLoadedClass = Array.prototype.slice.call(imgWrapper.classList).indexOf(shadowStyles.locals.loaded) > -1; // eslint-disable-line max-len
          expect(hasLoadedClass).to.equal(true);
        },
        done
      );
    });

    const testCases = [
      { src: undefined, expectImgToBeRendered: false },
      { src: oneByOnePixel, expectImgToBeRendered: true },
    ];

    testCases.forEach((testCase) => {
      it(`it should ${!testCase.expectImgToBeRendered ? 'not' : ''} render img tag when src set to ${testCase.src}`, (done) => { // eslint-disable-line max-len
        afterMutations(
          () => (component.src = testCase.src),
          () => {
            const img = component[symbols.shadowRoot].querySelector('img');
            expect(img !== null).to.equal(testCase.expectImgToBeRendered);
          },
          done
        );
      });
    });
  });

  describe('loading behaviour', () => {
    let component;
    let container;
    let imgWrapper;

    beforeEach((done) => {
      afterMutations(
        () => ([component, container] = setupAvatar(component, container)),
        // Need to set a src on the image to make sure the img tag is rendered
        () => (component.src = oneByOnePixel),
        () => (imgWrapper = component[symbols.shadowRoot].querySelector(`.${shadowStyles.locals.imgWrapper}`)), // eslint-disable-line  max-len
        // Make sure we have actually rendered the imgWrapper in the avatar
        () => expect(imgWrapper).to.not.be.null,
        done
      );
    });

    afterEach(() => {
      tearDownAvatar(container);
    });

    const testCases = [
      { loadingProp: true, expectImgToBeShown: false },
      { loadingProp: false, expectImgToBeShown: true },
    ];

    testCases.forEach((testCase) => {
      it(`should ${testCase.expectImgToBeShown ? 'show' : 'hide'} the image if __loading is ${testCase.loadingProp}`, (done) => { // eslint-disable-line  max-len
        const loadedClass = shadowStyles.locals.loaded;

        afterMutations(
          () => (component.__loading = testCase.loadingProp), // eslint-disable-line no-underscore-dangle, max-len
          () => {
            const hasLoadedClass = Array.prototype.slice.call(imgWrapper.classList).indexOf(loadedClass) > -1; // eslint-disable-line max-len
            expect(hasLoadedClass).to.equal(testCase.expectImgToBeShown);
          },
          done
        );
      });
    });
  });
});
