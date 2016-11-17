/** @jsx vdom */

import { vdom, define } from 'skatejs';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { getRootNode, createTemporaryComponent, tearDownComponent } from 'akutil-common-test';

import { name } from '../../package.json';
import LeftSlotContainer from '../../src/templates/LeftSlotContainer';
import shadowItemStyles from '../../src/less/shadow-item.less';


chai.use(chaiAsPromised);
chai.should();

describe.skip(name, () => {
  describe('LeftSlotContainer', () => {
    let component;
    let rootNode;

    const definition = {
      render() {
        return (<LeftSlotContainer test test2="test">children</LeftSlotContainer>);
      },
    };

    beforeEach(() => createTemporaryComponent(define, definition)
      .then((newComponent) => {
        component = newComponent;
        rootNode = getRootNode(component);
      }));
    afterEach(() => tearDownComponent(component));

    it('should be possible to create a LeftSlotContainer', () => {
      rootNode.tagName.should.equal('DIV');
    });

    it('all the external props should be attached', () => {
      expect(rootNode.getAttribute('test')).to.equal('true');
      expect(rootNode.getAttribute('test2')).to.equal('test');
    });

    it('children should be present', () => {
      expect(rootNode.textContent).to.equal('children');
    });

    it(`should have ${shadowItemStyles.locals.itemLeftPosition} class by default`, () => {
      expect(rootNode.getAttribute('class')).to.equal(shadowItemStyles.locals.itemLeftPosition);
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
});
