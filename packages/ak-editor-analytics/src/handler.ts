declare var window: Window;

export interface analyticsProperties {
  [key: string]: string | Number
}

export interface analyticsHandler {
  (name: string, properties?: analyticsProperties ): any
}

/**
 * Provider using globally available, configured Herment instance.
 *
 * @link https://bitbucket.org/atlassian/herment/overview
 */
export function hermentHandler(name: string, properties?: analyticsProperties): void {
  try {
    window.AJS.EventQueue.push({ name, properties });
  } catch (e) {
    console.warn('Unable to send analytics event via Herment - has it been initialized?', e);
  }
}

export function debugHandler(name: string, properties?: analyticsProperties): void {
  console.info('analytics event: ', name, properties ? properties : '[no properties]');
}

/**
 * Attempt to detect analytics provider.
 */
export function detectHandler() : analyticsHandler {
  // Check Herment is globally available
  if (
    window.AJS &&
    window.AJS.EventQueue &&
    typeof window.AJS.EventQueue.push === 'function'
  ) {
    return hermentHandler;
  }

  // Unable to detect a suitable handler
  return () => null;
}


// This declaration is needed for TS to allow invoking Herment queue methods
declare global {
  interface Window {
    AJS: {
      EventQueue: { push: (...args:any[]) => any }
    }
  }
}