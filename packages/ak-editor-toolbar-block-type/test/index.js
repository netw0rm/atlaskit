import { name } from '../package.json';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Component from '../src';
import BlockTypeSelect from '../src/block-type-select';
import { fixtures } from 'ak-editor-test';
import { afterMutations } from 'akutil-common-test';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe(name, () => {
  const fixture = fixtures();

  it('should be possible to create a component', () => {
    const component = new Component();
    expect(component.tagName).to.match(new RegExp(`^${name}`, 'i'));
  });

  it('should always be the same width', (done) => {
    const blockTypeSelect = fixture().appendChild(new BlockTypeSelect());

    afterMutations(
      () => {
        const buttonSpan = blockTypeSelect.shadowRoot.querySelector('span');
        const width = window.getComputedStyle(buttonSpan).width;
        expect(width).to.equal('80px');
      },
      done
    );
  });
});
