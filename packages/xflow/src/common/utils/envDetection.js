export const API_PROD_URL = 'https://api-private.atlassian.com';
export const API_STAG_URL = 'https://api-private.stg.atlassian.com';

export const JIRA_DEV = '.jira-dev.com';

export function getEnvAPIUrl(w = window, s = window.sessionStorage) {
  // Necessary for facilitating mocked servers and testing
  if (s && s.getItem('xflowEnvAPIUrlOverride')) {
    return s.getItem('xflowEnvAPIUrlOverride');
  }

  let isProd = true;
  try {
    isProd = !(w.location.hostname.slice(-JIRA_DEV.length) === JIRA_DEV || w.location.hostname === 'localhost');
  } catch (e) {
    // silence
  }

  return isProd ? API_PROD_URL : API_STAG_URL;
}
