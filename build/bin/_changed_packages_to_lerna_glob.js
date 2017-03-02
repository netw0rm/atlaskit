// Takes an array of changed packages and outputs a glob that will select all those packages in
// lerna.
// if we have more than 1 package, we output in the form
//  "{@atlaskit/packageOne,@atlaskit/packageTwo}" (no quotes)
// if exactly one, we output just the name itself "@atlaskit/packageOne" (no quotes)
// otherwise
function changedPackagesToLernaGlob(changedPackages) {
  if (changedPackages.length > 1) {
    return `{${changedPackages.join(',')}}`;
  } else if (changedPackages.length === 1) {
    return changedPackages[0];
  }
  return '';
}

module.exports = changedPackagesToLernaGlob;
