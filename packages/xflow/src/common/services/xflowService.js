import { getEnvAPIUrl } from '../utils/envDetection';

export const XFLOW_PROD_URL = 'https://api-private.atlassian.com/xflow';
export const XFLOW_STAG_URL = 'https://api-private.stg.atlassian.com/xflow';

export const getXFlowEndPoint = () => `${getEnvAPIUrl()}/xflow`;

export const notifyAccessEndpoint = () =>
  `${getXFlowEndPoint()}/notify-users-of-product-access`;

export const productRequestEndpoint = () =>
  `${getXFlowEndPoint()}/request-admins-for-product-trial`;
