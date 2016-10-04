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
        classes = style(vdom, el.css);
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

  describe(':host', () => {
    it('no selectors', done => {
      elem.css = { ':host': { display: 'none' } };
      afterMutations(
        () => expect(window.getComputedStyle(elem).display).to.equal('none'),
        done
      );
    });

    it('selectors', done => {
      elem.css = { ':host([test])': { display: 'none' } };
      afterMutations(
        () => expect(window.getComputedStyle(elem).display).to.equal('inline'),
        () => elem.setAttribute('test', ''),
        () => expect(window.getComputedStyle(elem).display).to.equal('none'),
        () => elem.removeAttribute('test'),
        () => expect(window.getComputedStyle(elem).display).to.equal('inline'),
        done
      );
    });
  });

  describe('::slotted', () => {
    it('(*)', done => {
      const span = document.createElement('span');
      elem.appendChild(span);
      afterMutations(
        () => expect(window.getComputedStyle(span).display).to.equal('inline'),
        () => (elem.css = { '::slotted(*)': { display: 'none' } }),
        () => expect(window.getComputedStyle(span).display).to.equal('none'),
        done
      );
    });

    it('(selector)', done => {
      const span = document.createElement('span');
      elem.appendChild(span);
      afterMutations(
        () => expect(window.getComputedStyle(span).display).to.equal('inline'),
        () => (elem.css = { '::slotted([test])': { display: 'none' } }),
        () => expect(window.getComputedStyle(span).display).to.equal('inline'),
        () => span.setAttribute('test', ''),
        () => expect(window.getComputedStyle(span).display).to.equal('none'),
        () => span.removeAttribute('test'),
        () => expect(window.getComputedStyle(span).display).to.equal('inline'),
        done
      );
    });

    // This is only necessary for polyfilled slots. We need to make sure that
    // styles only target slots within the current, polyfilled shadow root.
    describe('unscoped', () => {
      it('(*)', done => {
        const descendantSlot = document.createElement('slot');
        const descendantSlotParent = document.createElement('span');
        const descendantSlotChild = document.createElement('span');

        descendantSlotParent.appendChild(descendantSlot);
        descendantSlot.appendChild(descendantSlotChild);
        elem.appendChild(descendantSlotParent);

        afterMutations(
          // eslint-disable-next-line max-len
          () => expect(window.getComputedStyle(descendantSlotChild).position).to.equal('static'),

          // No need to test selectors here (we've done that above).
          () => (elem.css = { '.my-slot::slotted(*)': { position: 'relative' } }),

          // eslint-disable-next-line max-len
          () => expect(window.getComputedStyle(descendantSlotChild).position).to.equal('static'),
          done
        );
      });

      it('(selector)', done => {
        const descendantSlot = document.createElement('slot');
        const descendantSlotParent = document.createElement('span');
        const descendantSlotChild = document.createElement('span');

        descendantSlotParent.appendChild(descendantSlot);
        descendantSlot.appendChild(descendantSlotChild);
        elem.appendChild(descendantSlotParent);

        afterMutations(
          // eslint-disable-next-line max-len
          () => expect(window.getComputedStyle(descendantSlotChild).position).to.equal('static'),
          () => (elem.css = { '.my-slot::slotted([test])': { position: 'relative' } }),
          () => expect(window.getComputedStyle(descendantSlotChild).position).to.equal('static'),
          () => descendantSlotChild.setAttribute('test', ''),
          () => expect(window.getComputedStyle(descendantSlotChild).position).to.equal('static'),
          () => descendantSlotChild.removeAttribute('test'),
          // eslint-disable-next-line max-len
          () => expect(window.getComputedStyle(descendantSlotChild).position).to.equal('static'),
          done
        );
      });
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

  it('nested rule', done => {
    elem.css = {
      foo: {
        '&:hover': {},
      },
    };

    afterMutations(
      () => expect(classes.foo).to.match(/^foo-/),
      done
    );
  });
});
