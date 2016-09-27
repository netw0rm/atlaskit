import 'custom-event-polyfill';
import { createTemporaryComponent, tearDownComponent, getShadowRoot } from 'akutil-common-test'; // eslint-disable-line  max-len
import { vdom, define } from 'skatejs';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

import Image from '../src/Image';


chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.should();
const expect = chai.expect;

const oneByOnePixel = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';

function createDefinition(props) {
  return {
    render() {
      return (<Image {...props} />);
    },
  };
}


describe('ak-avatar', () => {
  describe('Image', () => {
    let component;

    afterEach(() => tearDownComponent(component));

    const testCases = [{
      props: {
        src: oneByOnePixel,
      },
      shouldRenderImg: true,
    }, {
      props: {
        src: null,
      },
      shouldRenderImg: false,
    }];

    testCases.forEach(test => {
      // eslint-disable-next-line  max-len
      it(`should ${test.shouldRenderImg ? '' : 'not'} render an img when the src prop="${test.props.src}"`, () => {
        const imgRendered = () => (getShadowRoot(component).querySelector('img') !== undefined);
        const definition = createDefinition({ src: oneByOnePixel });
        return createTemporaryComponent(define, definition)
          .then(newComponent => {
            component = newComponent;
            expect(imgRendered()).to.equal(true);
          });
      });
    });

    it('should pass on all props to the rendered img', () => {
      const props = {
        src: oneByOnePixel,
        alt: 'This is my fancy avatar!',
        className: 'foo',
      };
      const definition = createDefinition(props);

      return createTemporaryComponent(define, definition)
        .then(newComponent => {
          component = newComponent;
          const img = getShadowRoot(component).querySelector('img');

          expect(img.src).to.equal(props.src);
          expect(img.alt).to.equal(props.alt);
          expect(img.className).to.equal(props.className);
        });
    });
  });
});
