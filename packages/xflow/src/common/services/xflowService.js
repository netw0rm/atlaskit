import { getEnvAPIUrl } from '../utils/envDetection';

export const getXFlowEndPoint = () => `${getEnvAPIUrl()}/xflow`;

export const notifyAccessEndpoint = cloudId =>
  `${getXFlowEndPoint()}/${cloudId}/notify-users-of-product-access`;

export const productRequestEndpoint = cloudId =>
  `${getXFlowEndPoint()}/${cloudId}/request-admins-for-product-trial`;

export const licenseInformationEndpoint = cloudId =>
  `${getXFlowEndPoint()}/${cloudId}/license-information`;

export const startTrialEndpoint = cloudId => `${getXFlowEndPoint()}/${cloudId}/activate-product`;

export const grantAccessToProduct = cloudId =>
  `${getXFlowEndPoint()}/${cloudId}/grant-access-to-product`;

export const fetchInstanceUsersEndpoint = cloudId =>
  `${getXFlowEndPoint()}/${cloudId}/fetch-instance-users`;

export const fetchInstanceAdminsEndpoint = cloudId =>
  `${getXFlowEndPoint()}/${cloudId}/fetch-instance-admins`;
