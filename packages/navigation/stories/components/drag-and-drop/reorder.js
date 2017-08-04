// @flow
export default (
  list: any[],
  startIndex: number,
  endIndex: number,
) => {
  // make a shallow copy so we do not modify the original array
  const result: any[] = Array.from(list);

  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
