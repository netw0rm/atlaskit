import { vdom } from 'skatejs';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { createTemporaryComponent, tearDownComponent } from '../_helpers';
import { getRootNode } from 'akutil-common-test';
import DefaultSlotContainer from '../../src/internal/DefaultSlotContainer';
import shadowItemStyles from '../../src/less/shadow-item.less';

chai.use(chaiAsPromised);
chai.should();

describe('DefaultSlotContainer', () => {
  let component;
  let rootNode;

  const definition = {
    render() {
      return (<DefaultSlotContainer test test2="test">children</DefaultSlotContainer>);
    },
  };

  beforeEach(() => createTemporaryComponent(definition)
    .then((newComponent) => {
      component = newComponent;
      rootNode = getRootNode(component);
    }));
  afterEach(() => tearDownComponent(component));

  it('should be possible to create a DefaultSlotContainer', () => {
    rootNode.tagName.should.equal('DIV');
  });

  it('all the external props should be attached', () => {
    expect(rootNode.getAttribute('test')).to.equal('true');
    expect(rootNode.getAttribute('test2')).to.equal('test');
  });

  it('all the external props should be attached', () => {
    expect(rootNode.getAttribute('test')).to.equal('true');
    expect(rootNode.getAttribute('test2')).to.equal('test');
  });

  it('children should be present', () => {
    expect(rootNode.textContent).to.equal('children');
  });

  it(`should have ${shadowItemStyles.locals.itemDefaultPosition} class by default`, () => {
    expect(rootNode.getAttribute('class')).to.equal(shadowItemStyles.locals.itemDefaultPosition);
  });

  it('should not have any untested properties', () => {
    const properties = ['test', 'test2', 'class'].sort();
    const propsExisted = [];
    [...getRootNode(component).attributes].forEach((attr) => {
      propsExisted.push(attr.name);
    });

    propsExisted.sort().should.be.deep.equal(properties);
  });
});
