import { ACTIVE, ACTIVATING, INACTIVE } from '../common/productProvisioningStates';

export default async () => {
  const response = await fetch('/admin/rest/billing/api/instance/pricing', {
    credentials: 'same-origin',
    cache: 'no-store',
  });

  if (response.status !== 200) {
    throw new Error(
      `Unable to determine state of Confluence activation. Status: ${response.status}`
    );
  }

  const pricing = await response.json();
  const isActive = pricing.activeProducts.some(
    product => product.productKey === 'confluence.ondemand'
  );
  const isActivating = pricing.activatingProducts.includes('confluence.ondemand');

  if (isActive) {
    return ACTIVE;
  } else if (isActivating) {
    return ACTIVATING;
  }
  return INACTIVE;
};
