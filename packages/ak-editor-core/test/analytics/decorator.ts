import * as chai from 'chai';
import { expect } from 'chai';
import { SinonSpy } from 'sinon';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';

import analytics from '../../src/analytics/decorator';
import { AnalyticsHandler } from '../../src/analytics/handler';
import service from '../../src/analytics/service';
import { chaiPlugin } from '../../test-helper';

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

    const instance = new AnnotatedTestClass();
    expect(spy).to.have.not.been.called;

    instance.foo();
    expect(spy).to.have.been.calledWith('test.event');
    expect(spy.callCount).to.equal(1);

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

    const instance = new AnnotatedTestClass2();
    expect(spy).to.have.not.been.called;

    instance.foo();
    expect(spy).to.have.been.calledWith('test.event.foo');
    expect(spy.callCount).to.equal(1);

    instance.bar();
    expect(spy).to.have.been.calledTwice;
    expect(spy).to.have.been.calledWith('test.event.bar');
  });

  it('returns unique decorated bound method (property) per instance', () => {
    class AnnotatedTestClassWithBoundMethod {
      @analytics('test.event.foo')
      foo = () => {};
    }

    const instance1 = new AnnotatedTestClassWithBoundMethod();
    const instance2 = new AnnotatedTestClassWithBoundMethod();

    expect(instance1.foo).to.not.eq(instance2.foo);
  });

  it('returns property value if decorating a non-function property', () => {
    sinon.stub(console, 'warn', () => {});

    after(() => {
      (console.warn as any).restore();
    });

    class AnnotatedTestClassWithPrimitiveValue {
      @analytics('test.event.foo')
      foo = 15.15;
    }

    const instance = new AnnotatedTestClassWithPrimitiveValue();

    expect((console.warn as SinonSpy).called).to.equal(true);
    expect(instance.foo).to.eq(15.15);
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

    const instance = new AnnotatedTestClass3();
    expect(spy).to.have.not.been.called;

    instance.foo();
    expect(spy).to.have.been.calledTwice;
    expect(spy).to.have.been.calledWith('test.event.foo');
    expect(spy).to.have.been.calledWith('test.event.bar');
  });
});
