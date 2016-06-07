/* Instead of having an index.less file that imports everything we use a js file that imports
   everything the es6 way. This will allow us to properly trace dependancies and only import the
   things you actually need  */

import colors from './colors.less';
export { colors };
