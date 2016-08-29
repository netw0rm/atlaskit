import { afterMutations } from 'akutil-common-test';
import { symbols } from 'skatejs';
const { shadowRoot } = symbols;
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import Component from '../src';

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();

const expect = chai.expect;

describe('ak-lozenge', () => {
  let component;

  beforeEach((done) => {
    component = new Component();

    afterMutations(
      // append component to the body to ensure it has been rendered.
      () => document.body.appendChild(component),
      done
    );
  });

  afterEach(() => {
    document.body.removeChild(component);
  });

  it('should be possible to create a component', () => {
    expect(component[shadowRoot].innerHTML).to.match(/My name is .+?!/);
  });

  describe('name prop', () => {
    it('should modify the rendered name', (done) => {
      const newName = 'InigoMontoya';
      const expectedInnerHTML = `My name is ${newName}!`;
      const paragraph = component[shadowRoot].querySelector('p');

      // afterMutations will pause between each function passed to it to ensure the component has
      // re-rendered before starting the next step.
      afterMutations(
        () => { component.name = newName; },
        () => expect(paragraph.innerHTML).to.equal(expectedInnerHTML),
        done
      );
    });
  });
});
