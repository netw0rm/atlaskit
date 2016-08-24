import { afterMutations } from 'akutil-common-test';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { symbols } from 'skatejs';
const { shadowRoot } = symbols;
import Component from '../src/index.js';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect; // eslint-disable-line no-unused-vars


describe('ak-tag', () => {
  let component;

  beforeEach((done) => {
    component = new Component();
    component.text = 'X';

    afterMutations(
      // append component to the body to ensure it has been rendered.
      () => document.body.appendChild(component),
      done
    );
  });

  afterEach(() => {
    document.body.removeChild(component);
  });

  it('should be possible to create a component', (done) => {
    component.text = 'Jelly beans';
    afterMutations(
      () => component[shadowRoot].innerHTML.should.match(/Jelly beans/),
      done
    );
  });
});
