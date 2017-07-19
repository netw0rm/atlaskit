export default async () => {
  const response = await fetch('/admin/rest/billing/api/instance/prospective-prices', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    credentials: 'same-origin',
    cache: 'no-store',
    body: JSON.stringify({
      productKeys: ['confluence.ondemand'],
    }),
  });

  if (response.status !== 200) {
    throw new Error(
      `Unable to determine past Confluence activation state. Status: ${response.status}`
    );
  }

  const prospectivePrices = await response.json();
  return (
    prospectivePrices.deactivatedProducts.some(
      product => product.productKey === 'confluence.ondemand'
    ) ||
    !prospectivePrices.newProducts.some(product => product.productKey === 'confluence.ondemand')
  );
};
