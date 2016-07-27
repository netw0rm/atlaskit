import { name } from '../package.json';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import AkEditorButton from '../src';
import { symbols, state } from 'skatejs';
import shadowStyles from '../src/shadow.less';

const classKeys = shadowStyles.locals;

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('ak-editor-button', () => {
  const shadowDomQuery = (elem, classes) =>
    elem[symbols.shadowRoot].querySelector(classes);

  it('should be possible to create a component', () => {
    let component;
    expect(() => {
      component = new AkEditorButton();
    }).not.to.throw(Error);
    expect(component).to.be.defined;
    expect(shadowDomQuery(component, `.${classKeys.root}`)).to.be.defined;
    expect(component.tagName.toLowerCase()).to.equal(name);
  });

  describe('attributes', () => {
    let component;
    beforeEach(() => {
      component = new AkEditorButton();
    });

    describe('default attributes', () => {
      it('should not have active class', () => {
        const classes = `.${classKeys.root}.${classKeys.active}`;
        expect(shadowDomQuery(component, classes)).to.be.null;
      });

      it('should not have button disabled', () => {
        const classes = `.${classKeys.root} button[disabled]`;
        expect(shadowDomQuery(component, classes)).to.be.null;
      });
    });

    describe('when active attribute is set', () => {
      beforeEach(() => state(component, { active: true }));

      it('container should have active class', () => {
        const classes = `.${classKeys.root}.${classKeys.active}`;
        expect(shadowDomQuery(component, classes)).not.to.be.null;
      });

      it('container should not have active class after attribute is removed', () => {
        state(component, { active: false });
        const classes = `.${classKeys.root}.${classKeys.active}`;
        expect(shadowDomQuery(component, classes)).to.be.null;
      });
    });

    describe('when disabled attribute is set', () => {
      beforeEach(() => state(component, { disabled: true }));

      it('button should have disabled attribute', () => {
        const classes = `.${classKeys.root} button[disabled]`;
        expect(shadowDomQuery(component, classes)).not.to.be.null;
      });
    });
  });
});
