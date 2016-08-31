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
        return <slot className="my-slot" />;
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
        () => expect(window.getComputedStyle(span).position).to.equal('static', 'before'),
        () => (elem.css = { '::slotted(*)': { position: 'relative' } }),
        () => expect(window.getComputedStyle(span).position).to.equal('relative', 'after'),
        done
      );
    });

    // This is only necessary for polyfilled slots. We need to make sure that
    // styles only target slots within the current, polyfilled shadow root.
    it('slots outside of the shaow tree', done => {
      const descendantSlot = document.createElement('slot');
      const descendantSlotParent = document.createElement('span');
      const descendantSlotChild = document.createElement('span');
      descendantSlotParent.appendChild(descendantSlot);
      descendantSlot.appendChild(descendantSlotChild);
      elem.appendChild(descendantSlotParent);
      afterMutations(
        // eslint-disable-next-line max-len
        () => expect(window.getComputedStyle(descendantSlotChild).position).to.equal('static', 'before'),
        () => (elem.css = { '.my-slot::slotted(*)': { position: 'relative' } }),
        // eslint-disable-next-line max-len
        () => expect(window.getComputedStyle(descendantSlotChild).position).to.equal('static', 'after'),
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
