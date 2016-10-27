export default (text: string, regexp: RegExp) => {
  const results: RegExpExecArray[] = [];
  let match: RegExpExecArray;
  while (match = regexp.exec(text) as RegExpExecArray) {
    results.push(match);
   }
  return results;
};