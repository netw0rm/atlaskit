function getXFlowEndPoint() {
  return window.location.hostname.endsWith('jira-dev.com') ? 'https://api-private.stg.atlassian.com/xflow' :
    'https://api-private.atlassian.com/xflow';
}

export const notifyAccessEndpoint = () =>
  `${getXFlowEndPoint()}/notify-users-of-product-access`;

export const productRequestEndpoint = () =>
  `${getXFlowEndPoint()}/request-admins-for-product-trial`;
