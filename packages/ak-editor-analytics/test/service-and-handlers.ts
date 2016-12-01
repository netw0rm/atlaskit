import { default as chai, expect } from 'chai';
import service from '../src/service';
import { 
  analyticsHandler, 
  analyticsProperties, 
  detectHandler,
  hermentHandler 
} from '../src/Handler';

describe('analytics service', () => {
  it('auto-detects Herment', () => {
    window.AJS = {EventQueue: { push() {} }};
    expect(detectHandler()).to.equal(hermentHandler);
    delete window.AJS;
  });

  it('allows setting the handler', () => {
    let eventName;
    const handler: analyticsHandler = (name: string, props: analyticsProperties) => {
      eventName = name;
    };
    service.handler = handler; 
    service.trackEvent('test.event');
    expect(eventName).to.eq('test.event');
  });

  it('allows removing the handler', () => {
    let called = false;
    const Handler: analyticsHandler = (name: string, props: analyticsProperties) => {
      called = true;
    };
    service.handler = Handler;
    service.handler = null;
    service.trackEvent('test.event');
    expect(called).to.be.false; 
  });
});