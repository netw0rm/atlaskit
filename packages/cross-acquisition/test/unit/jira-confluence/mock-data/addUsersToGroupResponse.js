export default (url, options) => {
  const { users } = JSON.parse(options.body);
  return {
    expand: 'user',
    users,
  };
};
