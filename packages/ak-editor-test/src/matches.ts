export default (text: string, regexp: RegExp) => {
  const results: Array<RegExpExecArray> = [];
  let match: RegExpExecArray | null;
  while (match = regexp.exec(text)) {
    results.push(match);
   }
  return results;
};