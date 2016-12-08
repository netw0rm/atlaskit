/** @jsx vdom */

import { vdom } from 'skatejs';
import { getShadowRoot } from 'akutil-common-test';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { createTemporary, removeTemporary } from './_helpers';
import Root from '../src/Root';
import AnimationWrapper from '../src/AnimationWrapper';

chai.use(chaiAsPromised);
chai.should();

describe.skip('ak-tag', () => {
  describe('AnimationWrapper', () => {
    let component;

    afterEach(() => removeTemporary(component));

    it('should be possible to create an AnimationWrapper', () => {
      const definition = {
        render() {
          return (<AnimationWrapper />);
        },
      };

      return createTemporary(definition)
        .then((newComponent) => {
          component = newComponent;
          return getShadowRoot(component);
        })
        .then((shadowRoot) => {
          shadowRoot.should.exist;
        }).should.be.fulfilled;
    });

    it('should play the animation when being removed and call back after', (done) => {
      const definition = {
        render() {
          return (
            <Root>
              <AnimationWrapper isRemoving afterAnimation={sinon.spy(done)}>
                <div style={{ width: '200px', height: '20px', backgroundColor: 'red' }} />
              </AnimationWrapper>
            </Root>
          );
        },
      };
      createTemporary(definition).then(newComponent => (component = newComponent));
    });
  });
});
