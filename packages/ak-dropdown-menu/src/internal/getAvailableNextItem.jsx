export default (items, currentFocus) => {
  // if there is no currently focused item then it should be the first one
  if (!currentFocus) {
    return { item: 0, group: 0 };
  }
  let { item, group } = currentFocus;
  const groupLength = items[group].items.length - 1;
  if (item !== groupLength) {
    item++;
  } else if (group !== items.length - 1) {
    group++;
    item = 0;
  }

  return { item, group };
};
