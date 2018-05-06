export const API_URL = '/gateway/api';

export function getEnvAPIUrl(w = window, s = window.sessionStorage) {
  // Necessary for facilitating mocked servers and testing
  if (s && s.getItem('xflowEnvAPIUrlOverride')) {
    return s.getItem('xflowEnvAPIUrlOverride');
  }
  return API_URL;
}
