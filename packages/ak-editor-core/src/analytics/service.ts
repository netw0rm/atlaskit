import { AnalyticsHandler, AnalyticsProperties, detectHandler } from './handler';

/**
 * The service allows @analytics annotations to access the analytics Handler
 * from an arbitrary scope. This coupling assumes that there is only one analytics
 * Handler that should be used on the page across all components.
 */
export default new class {
  // trackEvent: analyticsHandler = (name: string, properties?: analyticsProperties) => {};
  trackEvent: AnalyticsHandler = detectHandler();

  set handler(handler: AnalyticsHandler | null) {
    this.trackEvent = handler ? handler : () => {};
  }
};
