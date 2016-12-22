export default (items, currentFocus) => {
  let { item, group } = currentFocus;
  if (item !== 0) {
    item--;
  } else if (group !== 0) {
    group--;
    item = items[group].items.length - 1;
  }

  return { item, group };
};
