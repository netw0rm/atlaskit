import { define, vdom } from 'skatejs';
import { afterMutations } from 'akutil-common-test';
import { style } from '../src';

describe('style', () => {
  let classes;
  let elem;

  beforeEach(done => {
    const Elem = define('x-test', {
      props: {
        css: {},
      },
      render(el) {
        classes = style(el.css);
        return <slot />;
      },
    });
    elem = new Elem();
    document.body.appendChild(elem);
    afterMutations(done);
  });

  afterEach(done => {
    document.body.removeChild(elem);
    afterMutations(done);
  });

  it(':host', done => {
    elem.css = { ':host': { display: 'none' } };
    afterMutations(
      () => expect(window.getComputedStyle(elem).display).to.equal('none'),
      done
    );
  });

  describe('::slotted', () => {
    it('scoped slots', done => {
      const span = document.createElement('span');
      elem.appendChild(span);
      afterMutations(
        () => expect(window.getComputedStyle(span).display).to.equal('inline'),
        () => (elem.css = { '::slotted(*)': { display: 'none' } }),
        () => expect(window.getComputedStyle(span).display).to.equal('none'),
        done
      );
    });

    // This is only necessary for polyfilled slots. We need to make sure that
    // styles only target slots within the current, polyfilled shadow root.
    it('slots outside of the shaow tree', done => {
      const slot = document.createElement('slot');
      const span = document.createElement('span');
      span.appendChild(slot);
      elem.appendChild(span);
      afterMutations(
        () => expect(window.getComputedStyle(span).display).to.equal('inline'),
        () => (elem.css = { '::slotted(*)': { display: 'none' } }),
        () => expect(window.getComputedStyle(span).display).to.equal('inline'),
        done
      );
    });
  });

  it('classes', done => {
    elem.css = {
      ':host': {},
      '::slotted(*)': {},
      'some selector': {},
      'some .selector': {},
      '.some selector': {},
      '.some .selector': {},
    };
    afterMutations(
      () => expect(classes['some selector']).to.match(/^some selector-/),
      () => expect(classes['some .selector']).to.match(/^some \.selector-/),
      () => expect(classes['.some selector']).to.match(/^\.some selector-/),
      () => expect(classes['.some .selector']).to.match(/^\.some \.selector-/),
      done
    );
  });
});
