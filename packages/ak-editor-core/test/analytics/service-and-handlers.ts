import * as chai from 'chai';
import { expect } from 'chai';
import service from '../../src/analytics/service';
import { 
  AnalyticsHandler, 
  AnalyticsProperties, 
  detectHandler,
  hermentHandler 
} from '../../src/analytics/handler';

describe('analytics service', () => {
  it('auto-detects Herment', () => {
    window.AJS = {EventQueue: { push() {} }};
    expect(detectHandler()).to.equal(hermentHandler);
    delete window.AJS;
  });

  it('allows setting the handler', () => {
    let eventName;
    const handler: AnalyticsHandler = (name: string, props: AnalyticsProperties) => {
      eventName = name;
    };
    service.handler = handler; 
    service.trackEvent('test.event');
    expect(eventName).to.eq('test.event');
  });

  it('allows removing the handler', () => {
    let called = false;
    const Handler: AnalyticsHandler = (name: string, props: AnalyticsProperties) => {
      called = true;
    };
    service.handler = Handler;
    service.handler = null;
    service.trackEvent('test.event');
    expect(called).to.be.false; 
  });
});