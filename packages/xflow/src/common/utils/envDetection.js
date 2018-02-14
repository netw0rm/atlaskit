export const API_URL = '/gateway/api/';
export const API_DEV_URL = 'https://api-private.stg.atlassian.com';

export function getEnvAPIUrl(w = window, s = window.sessionStorage) {
  // Necessary for facilitating mocked servers and testing
  if (s && s.getItem('xflowEnvAPIUrlOverride')) {
    return s.getItem('xflowEnvAPIUrlOverride');
  }

  let isLocalhost = false;
  try {
    isLocalhost = w.location.hostname === 'localhost';
  } catch (e) {
    // silence
  }

  return isLocalhost ? API_DEV_URL : API_URL;
}
