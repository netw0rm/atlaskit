import { afterMutations } from 'akutil-common';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { symbols, props } from 'skatejs';
import AkutilComponentTemplate from '../src/index.js';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;
const shadowRoot = symbols.shadowRoot;

describe('akutil-component-template', () => {
  let component;

  beforeEach((done) => {
    component = new AkutilComponentTemplate();

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
        () => props(component, { name: newName }),
        () => expect(paragraph.innerHTML).to.equal(expectedInnerHTML),
        done
      );
    });
  });
});
