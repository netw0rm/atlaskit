import { Component } from 'skatejs';
import { waitUntil, afterMutations, getShadowRoot } from 'akutil-common-test';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import Tag, { exceptions, events } from '../src';
const { NotRemovableError } = exceptions;
const { beforeRemove: beforeRemoveEvent, afterRemove: afterRemoveEvent } = events;
import { getRootNode } from './_helpers';

chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.should();


describe('ak-tag', () => {
  let component;
  let rootNode;

  beforeEach(() => {
    component = new Tag();
    component.text = 'X';
    document.body.appendChild(component);

    return waitUntil(() => !!getShadowRoot(component))
      .then(() => (rootNode = getRootNode(component)));
  });

  afterEach(() => {
    document.body.removeChild(component);
  });

  describe('exports', () => {
    it('should export a base component', () => {
      (new Tag).should.be.an.instanceof(Component);
    });

    it('should have an events export with defined events', () => {
      events.should.be.defined;
      Object.keys(events).should.be.deep.equal(['beforeRemove', 'afterRemove']);
    });

    it('should have an exceptions export with defined exceptions', () => {
      exceptions.should.be.defined;
      Object.keys(exceptions).should.be.deep.equal(['NotRemovableError']);
    });
  });

  it('should be possible to create a component', (done) => {
    const text = 'Jelly beans';
    component.text = text;

    afterMutations(
      () => getShadowRoot(component).innerHTML.should.match(new RegExp(text)),
      done
    );
  });

  describe('linked', () => {
    it('status should be reflected', (done) => {
      afterMutations(
        () => {
          component.isLinked().should.be.false;
          expect(rootNode.querySelector('a')).to.be.null;
        },
        () => (component.href = 'http://some.url'),
        () => {
          component.isLinked().should.be.true;
          expect(rootNode.querySelector('[role=link]')).to.not.be.null;
          expect(rootNode.querySelector('a')).to.not.be.null;
        },
        done
      );
    });
  });

  describe('removable', () => {
    it('status should be reflected', (done) => {
      const removeButtonText = 'Remove me';
      afterMutations(
        () => {
          component['remove-button-text'].should.be.equal('');
          component.isRemovable().should.be.false;
        },
        () => (component['remove-button-text'] = removeButtonText),
        () => {
          component.isRemovable().should.be.true;
          rootNode.querySelector('button')
            .getAttribute('aria-label')
              .should.be.equal(removeButtonText);
        },
        done
      );
    });

    it('should throw if being removed without being removable', () => {
      expect(() => component.remove()).to.throw(NotRemovableError);
    });

    it('should be possible to remove a tag', (done) => {
      const beforeRemoveEventSpy = sinon.spy();
      const afterRemoveEventSpy = sinon.spy(() => done());
      component.addEventListener(beforeRemoveEvent, beforeRemoveEventSpy);
      component.addEventListener(afterRemoveEvent, afterRemoveEventSpy);

      afterMutations(
        () => (component['remove-button-text'] = 'x'),
        () => component.isRemovable().should.be.true,
        () => {
          component.remove();
          beforeRemoveEventSpy.should.have.been.calledOnce;
        }
        // we can't add `done` here, as it will be invoked on animation end (~250ms)
      );
    });

    it('should emit the component as a detail before and after it was removed', (done) => {
      let detailBefore;
      component.addEventListener(beforeRemoveEvent, (e) => {
        detailBefore = e.detail.item;
      });
      component.addEventListener(afterRemoveEvent, (e) => {
        expect(e.detail.item).to.equal(component);
        done();
      });

      afterMutations(
        () => (component['remove-button-text'] = 'x'),
        () => component.isRemovable().should.be.true,
        () => (component.remove()),
        () => (expect(detailBefore).to.equal(component))
        // we can't add `done` here, as it will be invoked on animation end (~250ms)
      );
    });
  });
});
