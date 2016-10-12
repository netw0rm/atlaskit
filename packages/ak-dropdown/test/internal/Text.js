import { vdom } from 'skatejs';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { createTemporaryComponent, tearDownComponent } from '../_helpers';
import { getRootNode } from 'akutil-common-test';
import Text from '../../src/internal/Text';

chai.use(chaiAsPromised);
chai.should();

describe('Text', () => {
  let component;
  let rootNode;

  const definition = {
    render() {
      return (<Text test test2="test">children</Text>);
    },
  };

  beforeEach(() => createTemporaryComponent(definition)
    .then((newComponent) => {
      component = newComponent;
      rootNode = getRootNode(component);
    }));
  afterEach(() => tearDownComponent(component));

  it('should be possible to create a Text', () => {
    rootNode.tagName.should.equal('SPAN');
  });

  it('all the external props should be attached', () => {
    expect(rootNode.getAttribute('test')).to.equal('true');
    expect(rootNode.getAttribute('test2')).to.equal('test');
  });

  it('children should be present', () => {
    expect(rootNode.textContent).to.equal('children');
  });

  it('should not have any untested properties', () => {
    const properties = ['test', 'test2'].sort();
    const propsExisted = [];
    [...getRootNode(component).attributes].forEach((attr) => {
      propsExisted.push(attr.name);
    });

    propsExisted.sort().should.be.deep.equal(properties);
  });
});
