import { vdom } from 'skatejs';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { getRootNode } from 'akutil-common-test';

import { createTemporaryComponent, tearDownComponent } from '../_helpers';
import Href from '../../src/templates/Href';


chai.use(chaiAsPromised);
chai.should();

describe('Href', () => {
  let component;
  let rootNode;

  const definition = {
    render() {
      return (<Href test test2="test">children</Href>);
    },
  };

  beforeEach(() => createTemporaryComponent(definition)
    .then((newComponent) => {
      component = newComponent;
      rootNode = getRootNode(component);
    }));
  afterEach(() => tearDownComponent(component));

  it('should be possible to create a Href', () => {
    rootNode.tagName.should.equal('A');
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
