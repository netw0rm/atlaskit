import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';

import { fixtures, chaiPlugin } from '../../test-helper';
import analytics from '../../src/analytics/decorator';
import service from '../../src/analytics/service';
import { AnalyticsHandler } from '../../src/analytics/handler';

chai.use(chaiPlugin);
chai.use((sinonChai as any).default || sinonChai);

describe('analytics decorator', () => {
  let spy: any;

  beforeEach(() => {
    spy = sinon.spy();
    service.handler = (spy as AnalyticsHandler);
  });

  afterEach(() => {
    spy = null;
    service.handler = null;
  });

  it('tracks events after class method is called', () => {
    class AnnotatedTestClass {
      @analytics('test.event')
      foo() {}
    }

    let instance = new AnnotatedTestClass();
    expect(spy).to.have.not.been.called;

    instance.foo();
    expect(spy).to.have.been.calledWith('test.event');
    expect(spy).to.have.been.calledOnce;

    instance.foo();
    expect(spy).to.have.been.calledTwice;
    expect(spy).to.have.been.calledWith('test.event');
  });

  it('tracks events after bound method (instance property) is called', () => {
    class AnnotatedTestClass2 {
      @analytics('test.event.foo')
      foo = () => {};

      @analytics('test.event.bar')
      bar = () => {};
    }

    let instance = new AnnotatedTestClass2();
    expect(spy).to.have.not.been.called;

    instance.foo();
    expect(spy).to.have.been.calledWith('test.event.foo');
    expect(spy).to.have.been.calledOnce;

    instance.bar();
    expect(spy).to.have.been.calledTwice;
    expect(spy).to.have.been.calledWith('test.event.bar');
  });

  it('can track private methods being called', () => {
    class AnnotatedTestClass3 {
      @analytics('test.event.foo')
      foo = () => {
        this.bar();
      }

      @analytics('test.event.bar')
      private bar = () => {};
    }

    let instance = new AnnotatedTestClass3();
    expect(spy).to.have.not.been.called;

    instance.foo();
    expect(spy).to.have.been.calledTwice;
    expect(spy).to.have.been.calledWith('test.event.foo');
    expect(spy).to.have.been.calledWith('test.event.bar');
  });
});
