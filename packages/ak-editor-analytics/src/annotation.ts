import service from './service';

/**
 * Annotation for automatically tracking analytics event whenever a function is invoked.?
 *
 * The @analytics annotation can only be used on methods and functions. It requires a single
 * argument with the event name. It will relay the event via analytics/service and requires
 * that desired provider is set in analytics/service.provider = provider.
 *
 * Usage:
 * 
 *     import analytics from 'analytics/annotation';
 *
 *     class Component {
 *        @analytics('atlassian.component.click')
 *        onClick() {
 *          // ...
 *        }
 *     }
 */
export default function analytics(name: string){
  return function (
    target: any,
    key: string,
    descriptor: PropertyDescriptor
  ) {
    if (!name) {
      throw new SyntaxError('@analytics requires an event name');
    }

    if (!descriptor) {
      throw new SyntaxError('@analytics can only be used on functions');
    }

    const fn = descriptor.value;
    if (typeof fn !== 'function') {
      throw new SyntaxError(`@analytics can only be used on functions, not: ${fn}`);
    }

    return {
      // TS 2.1.3 fixes "error TS1136: Property assignment expected" with spread
      ...descriptor,
      
      value() {
        // We do not want analytics' problems to prevent invocation of the annotated method
        try {
          service.trackEvent(name);
        } catch (e) {
          console.error('An exception has been thrown when trying to track analytics event:', e);
        }

        return fn.apply(this, arguments);
      }
    };
  };
};
