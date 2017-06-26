export const breakpointClassName = (rules, value: number | string) :string => {
  value = parseInt(`${value}`, 0); // Normalize value
  let currentRule;

  Object.keys(rules).forEach(name => {
    if (value < rules[name] && !currentRule) {
      currentRule = name;
    }
  });

  return `${currentRule}-breakpoint`;
};
