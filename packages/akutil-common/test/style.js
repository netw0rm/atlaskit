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

  it('::slotted', done => {
    const span = document.createElement('span');
    elem.appendChild(span);
    afterMutations(
      () => expect(window.getComputedStyle(span).color).to.equal('rgb(0, 0, 0)'),
      () => (elem.css = { '::slotted(*)': { color: 'blue' } }),
      () => expect(window.getComputedStyle(span).color).to.equal('rgb(0, 0, 255)'),
      done
    );
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
