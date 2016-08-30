import { name } from '../package.json';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { emit, symbols } from 'skatejs';
import Component from '../src';
import shadowStyles from '../src/shadow.less';
import { afterMutations } from 'akutil-common-test';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe(name, () => {
  let fixture;

  beforeEach(() => {
    fixture = document.createElement('div');
    document.body.appendChild(fixture);
  });

  afterEach(() => {
    document.body.removeChild(fixture);
  });

  it('should be possible to create a component', () => {
    const component = new Component();
    expect(component.tagName).to.match(new RegExp(`^${name}`, 'i'));
  });

  describe('button events', () => {
    it('should trigger save event', done => {
      let clicked = false;
      const component = new Component();
      fixture.appendChild(component);
      component.addEventListener('save', () => { clicked = true; });
      afterMutations(
        () => {
          const button = component[symbols.shadowRoot]
            .querySelector(`.${shadowStyles.locals.saveButton}`);
          emit(button, 'click');
        },
        () => expect(clicked).to.equal(true),
        done
      );
    });

    it('should trigger cancel event', done => {
      let clicked = false;
      const component = new Component();
      fixture.appendChild(component);
      component.addEventListener('cancel', () => { clicked = true; });
      afterMutations(
        () => {
          const button = component[symbols.shadowRoot]
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
      const component = new Component();
      fixture.appendChild(component);
      component.addEventListener('insertmention', () => { clicked = true; });
      afterMutations(
        () => {
          const insert = component[symbols.shadowRoot].querySelectorAll('button')[2];
          emit(insert, 'click');
        },
        () => expect(clicked).to.equal(true),
        done
      );
    });

    it('should trigger image event', done => {
      let clicked = false;
      const component = new Component();
      fixture.appendChild(component);
      component.addEventListener('insertimage', () => { clicked = true; });
      afterMutations(
        () => {
          const insert = component[symbols.shadowRoot].querySelectorAll('button')[3];
          emit(insert, 'click');
        },
        () => expect(clicked).to.equal(true),
        done
      );
    });
  });
});
