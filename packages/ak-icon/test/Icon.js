/** @jsx vdom */

import { define, vdom, Component } from 'skatejs';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {
  getRootNode,
  createTemporaryComponent,
  tearDownComponent,
} from 'akutil-common-test';

import { name } from '../package.json';
import Icon, { NotImplementedError } from '../src/Icon';

chai.use(chaiAsPromised);
chai.should();

describe.skip(name, () => {
  let component;

  afterEach(() => tearDownComponent(component));

  describe('Icon', () => {
    it('should be a SkateJS component definition', () => {
      Icon.prototype.should.be.instanceof(Component);
    });

    it.skip('should throw if not subclassed', (done) => {
      // currently skipped because of IE11 on BrowserStack
      // works fine in local IE from VirtualBox and also works fine
      // in BrowserStack live
      const orig = window.onerror;
      window.onerror = (message, source, lineno, colno, error) => {
        error.should.be.instanceof(NotImplementedError);
        window.onerror = orig;
        done();
      };

      const IconComponent = define('x-icon', Icon);
      component = new IconComponent();
      document.body.appendChild(component);
    });

    it('should be possible to create an Icon via a subclass', () => {
      const secret = 'secret';
      class MyIcon extends Icon {
        // eslint-disable-next-line class-methods-use-this
        getGlyphTemplate() {
          return () => (<div>{secret}</div>);
        }
      }
      return createTemporaryComponent(define, MyIcon)
        .then((newComponent) => {
          component = newComponent;
          getRootNode(component).innerHTML.should.match(new RegExp(secret));
        }).should.be.fulfilled;
    });
  });
});
