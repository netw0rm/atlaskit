import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { symbols } from 'skatejs';
import { name } from '../package.json';
import AKAvatar from '../src/index.js';
import { getInitialsForAllColors } from '../src/helpers.js';
import shadowStyles from '../src/shadow.less';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

const defaultSize = 'medium';
const defaultPresence = 'none';
const defaultLabel = undefined;
const defaultBorderColor = undefined;

const avatarSizes = {
  xsmall: 16,
  small: 24,
  medium: 32,
  large: 48,
  xlarge: 96,
};

/* Creates a default avatar in a div, appends it to the body and returns a reference to both */
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

  it('should have all the expected default properties after creation', () => {
    const component = new AKAvatar();

    expect(component.size).to.equal(defaultSize, 'size');
    expect(component.presence).to.equal(defaultPresence, 'presence');
    expect(component.label).to.equal(defaultLabel, 'label');
    expect(component.borderColor).to.equal(defaultBorderColor, 'borderColor');
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
          const rect = component.getClientRects()[0];
          expected = avatarSizes[size] + 2 * borderSize;
          expect(rect.height).to.equal(expected);
          expect(rect.width).to.equal(expected);
        }, done);
      });
    });
  });

  describe('label property', () => {
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
      const label = 'This is an avatar!';

      component.label = label;

      afterMutation(() => {
        expect(outerDiv.getAttribute('aria-label')).to.equal(label, 'label');
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

    beforeEach(() => {
      [component, container] = setupAvatar(component, container);
    });

    afterEach(() => {
      document.body.removeChild(container);
    });

    it('should set the src property on the internal img', (done) => {
      component.src = oneByOnePixel;

      afterMutation(() => {
        const img = component[symbols.shadowRoot].firstChild.querySelector('img');
        expect(img.src).to.equal(oneByOnePixel);
        done();
      }, done);
    });
  });

  describe('fullName property', () => {
    const oneByOnePixel = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
    let component;
    let container;
    let outerDiv;

    beforeEach(() => {
      [component, container] = setupAvatar(component, container);
      outerDiv = component[symbols.shadowRoot].firstChild;
    });

    afterEach(() => {
      document.body.removeChild(container);
    });

    it('should not display any text if a src is defined', (done) => {
      component.src = oneByOnePixel;
      component.fullName = 'Charlie Atlas';

      afterMutation(() => {
        expect(outerDiv.innerText).to.equal('');
      }, done);
    });

    it('should set the background color to transparent if src is defined', (done) => {
      component.src = oneByOnePixel;
      component.fullName = 'Charlie Atlas';
      const transparent = 'rgba(0, 0, 0, 0)';

      afterMutation(() => {
        expect(getComputedStyle(outerDiv).backgroundColor).to.equal(transparent);
      }, done);
    });

    it('should set the background color when fullname is set', (done) => {
      component.fullName = 'Charlie Atlas';
      const transparent = 'rgba(0, 0, 0, 0)';

      afterMutation(() => {
        expect(getComputedStyle(outerDiv).backgroundColor).to.not.equal(transparent);
      }, done);
    });

    // Lots of similar tests here so we set up some test data with expected values
    const tests = [{
      desc: 'should handle simple first and last names',
      name: 'Charlie Atlas',
      expected: 'CA',
    }, {
      desc: 'should only show the first letter if only one name provided',
      name: 'Charlie',
      expected: 'C',
    }, {
      desc: 'should work with multiple \'middle names\'',
      name: 'Charlie James Otter Fairydust Atlas',
      expected: 'CA',
    }, {
      desc: 'should capitalise initials for one name',
      name: 'charlie',
      expected: 'C',
    }, {
      desc: 'should capitalise initials for two names',
      name: 'charlie atlas',
      expected: 'CA',
    }];

    tests.forEach((testData) => {
      it(testData.desc, (done) => {
        component.fullName = testData.name;
        const expectedIntitials = testData.expected;

        afterMutation(() => {
          expect(outerDiv.innerText).to.equal(expectedIntitials);
        }, done);
      });
    });

    it('should be able to generate all possible colors from a set of initials', () => {
      const initials = getInitialsForAllColors();

      Object.keys(initials).forEach(color => {
        // We do the check twice here so we can make debugging easier if we ever break this test
        if (!initials[color]) {
          console.log(`Unable to find initials to generate the color: ${color}`); // eslint-disable-line no-console, max-len
        }

        expect(initials[color]).to.not.be.equal(true, color);
      });
    });
  });
});
