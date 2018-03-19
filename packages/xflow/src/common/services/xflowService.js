import { getEnvAPIUrl } from '../utils/envDetection';

export const getXFlowEndPoint = () => `${getEnvAPIUrl()}/xflow`;

export const grantAccessEndpoint = (cloudId) =>
  `${getXFlowEndPoint()}/${cloudId}/grant-access-to-product`;

export const notifyAccessEndpoint = (cloudId) =>
  `${getXFlowEndPoint()}/${cloudId}/notify-users-of-product-access`;

export const productRequestEndpoint = cloudId =>
  `${getXFlowEndPoint()}/${cloudId}/request-admins-for-product-trial`;

export const licenseInformationEndpoint = (cloudId) =>
  `${getXFlowEndPoint()}/${cloudId}/license-information`;
