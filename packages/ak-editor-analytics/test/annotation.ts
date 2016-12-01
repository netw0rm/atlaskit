import { default as chai, expect } from 'chai';
import AkEditorBitbucket from '../src';
import { symbols, emit } from 'skatejs';
import { fixtures, RewireSpy, chaiPlugin } from 'ak-editor-test';
import analytics from '../src/annotation';
import service from '../src/service';
import { analyticsHandler } from '../src/handler';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';

chai.use(chaiPlugin);
chai.use(sinonChai);

describe('analytics annotation', () => {
  class AnnotatedTestClass {
    @analytics('test.event')
    foo() {}
  }

  it('tracks events after method is called', () => {
    let spy = sinon.spy();
    service.handler = (spy as analyticsHandler);
    
    let instance = new AnnotatedTestClass();
    expect(spy).to.have.not.been.called;

    instance.foo();
    expect(spy).to.have.been.calledWith('test.event');
    expect(spy).to.have.been.calledOnce;

    instance.foo();
    expect(spy).to.have.been.calledTwice;
    expect(spy).to.have.been.calledWith('test.event');
  });
});