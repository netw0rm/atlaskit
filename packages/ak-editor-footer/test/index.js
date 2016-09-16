import { name } from '../package.json';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { emit } from 'skatejs';
import Component from '../src';
import shadowStyles from '../src/shadow.less';
import { afterMutations, getShadowRoot } from 'akutil-common-test';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe(name, () => {
  let component;

  beforeEach(() => {
    component = new Component();
    document.body.appendChild(component);
  });

  afterEach(() => document.body.removeChild(component));

  it('should be possible to create a component', () => {
    expect(component.tagName).to.match(new RegExp(`^${name}`, 'i'));
  });

  describe('button events', () => {
    it('should trigger save event', done => {
      let clicked = false;
      component.addEventListener('save', () => { clicked = true; });
      afterMutations(
        () => {
          const button = getShadowRoot(component)
            .querySelector(`.${shadowStyles.locals.saveButton}`);
          emit(button, 'click');
        },
        () => expect(clicked).to.equal(true),
        done
      );
    });

    it('should trigger cancel event', done => {
      let clicked = false;
      component.addEventListener('cancel', () => { clicked = true; });
      afterMutations(
        () => {
          const button = getShadowRoot(component)
            .querySelector(`.${shadowStyles.locals.cancelButton}`);
          emit(button, 'click');
        },
        () => expect(clicked).to.equal(true),
        done
      );
    });
  });

  describe('insert events', () => {
    it('should trigger mention event', done => {
      let clicked = false;
      component.addEventListener('insertmention', () => { clicked = true; });
      afterMutations(
        () => {
          const insert = getShadowRoot(component).querySelectorAll('button')[2];
          emit(insert, 'click');
        },
        () => expect(clicked).to.equal(true),
        done
      );
    });

    it('should trigger image event', done => {
      let clicked = false;
      component.addEventListener('insertimage', () => { clicked = true; });
      afterMutations(
        () => {
          const insert = getShadowRoot(component).querySelectorAll('button')[3];
          emit(insert, 'click');
        },
        () => expect(clicked).to.equal(true),
        done
      );
    });
  });
});
