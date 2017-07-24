import { getInstanceName } from './tenantContext';

export default () => {
  location.href = `https://${getInstanceName()}/wiki/`;
};
