import { getEnvAPIUrl } from '../utils/envDetection';

export const getXFlowEndPoint = () => `${getEnvAPIUrl()}/xflow`;

export const notifyAccessEndpoint = () =>
  `${getXFlowEndPoint()}/notify-users-of-product-access`;

export const productRequestEndpoint = () =>
  `${getXFlowEndPoint()}/request-admins-for-product-trial`;

export const licenseInformationEndpoint = (cloudId) =>
  `${getXFlowEndPoint()}/${cloudId}/license-information`;
