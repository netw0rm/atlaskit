export default async (key) => {
  const response = fetch('/rest/api/2/mypermissions', {
    credentials: 'same-origin',
  });
  const { permissions } = await response.json();
  return (permissions[key] || { havePermission: false }).havePermission;
};
