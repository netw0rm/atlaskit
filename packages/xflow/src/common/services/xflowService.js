export const XFLOW_PROD_URL = 'https://api-private.atlassian.com/xflow';
export const XFLOW_STAG_URL = 'https://api-private.stg.atlassian.com/xflow';

export const getXFlowEndPoint = (w = window) => {
  let isProd = true;
  try {
    isProd = !(w.location.hostname.endsWith('jira-dev.com') || w.location.hostname === 'localhost');
  } catch (e) {
    // silence
  }
  return isProd ? XFLOW_PROD_URL : XFLOW_STAG_URL;
};

export const notifyAccessEndpoint = () =>
  `${getXFlowEndPoint()}/notify-users-of-product-access`;

export const productRequestEndpoint = () =>
  `${getXFlowEndPoint()}/request-admins-for-product-trial`;
