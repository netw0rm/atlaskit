/** @jsx vdom */

import { vdom, props, prop, define } from 'skatejs';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { getRootNode, createTemporaryComponent, tearDownComponent } from 'akutil-common-test';

import { name } from '../../package.json';
import Item from '../../src/templates/Item';
import shadowItemStyles from '../../src/less/shadow-item.less';


chai.use(chaiAsPromised);
chai.should();

describe.skip(name, () => {
  describe('Item', () => {
    let component;
    const definition = {
      render(elem) {
        return (<Item {...props(elem)}>children</Item>);
      },
      props: {
        href: prop.string({ attribute: true }),
        target: prop.string({ attribute: true }),
        disabled: prop.boolean({ attribute: true }),
        active: prop.boolean({ attribute: true }),
        test: prop.boolean({ attribute: true }),
      },
    };

    beforeEach(() => createTemporaryComponent(define, definition)
      .then((newComponent) => {
        component = newComponent;
      }));
    afterEach(() => tearDownComponent(component));

    it('external props should be attached', () => {
      props(component, { test: true });
      expect(getRootNode(component).getAttribute('test')).to.equal('true');
    });

    it('children should be present', () => {
      expect(getRootNode(component).textContent).to.equal('children');
    });

    it(`should have ${shadowItemStyles.locals.item} class by default`, () => {
      expect(getRootNode(component).getAttribute('class')).to.equal(shadowItemStyles.locals.item);
    });

    it(`should have ${shadowItemStyles.locals.item} and ${shadowItemStyles.locals.disabled} classes
        if item is 'disabled'`, () => {
      props(component, { disabled: true });
      const classes = `${shadowItemStyles.locals.item} ${shadowItemStyles.locals.disabled}`;
      expect(getRootNode(component).getAttribute('class')).to.equal(classes);
    });

    it(`should have ${shadowItemStyles.locals.item} and ${shadowItemStyles.locals.active} classes
        if item is 'active'`, () => {
      props(component, { active: true });
      const classes = `${shadowItemStyles.locals.item} ${shadowItemStyles.locals.active}`;
      expect(getRootNode(component).getAttribute('class')).to.equal(classes);
    });

    it('if `href` property is present `Item` should render `Href` element', () => {
      props(component, { href: 'test' });
      expect(getRootNode(component).tagName).to.equal('A');
    });

    it('if `target` property is present `Item` should render `Href` element', () => {
      props(component, { target: 'test' });
      expect(getRootNode(component).tagName).to.equal('A');
    });

    it('if `target` and `href` properties are missing `Item` should render `Text` element', () => {
      expect(getRootNode(component).tagName).to.equal('SPAN');
    });

    it('should have `tabindex` property by default', () => {
      expect(getRootNode(component).getAttribute('class')).to.equal(shadowItemStyles.locals.item);
    });

    it('should have `aria-disabled` when disabled', () => {
      expect(getRootNode(component).getAttribute('aria-disabled')).to.equal(null);
      props(component, { disabled: true });
      expect(getRootNode(component).getAttribute('aria-disabled')).to.equal('true');
    });

    it('should not have any untested properties', () => {
      const properties = ['tabindex', 'class', 'href', 'target'].sort();
      const propsExisted = [];
      [...getRootNode(component).attributes].forEach((attr) => {
        propsExisted.push(attr.name);
      });

      propsExisted.sort().should.be.deep.equal(properties);
    });
  });
});
