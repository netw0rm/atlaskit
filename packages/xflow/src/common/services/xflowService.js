function getXFlowEndPoint() {
  return process.env.NODE_ENV !== 'development' ? 'https://api-private.stg.atlassian.com/xflow' : 'https://api-private.atlassian.com/xflow';
}

export const notifyAccessEndpoint = () =>
  `${getXFlowEndPoint()}/notify-users-of-product-access`;

export const productRequestEndpoint = () =>
  `${getXFlowEndPoint()}/request-admins-for-product-trial`;
