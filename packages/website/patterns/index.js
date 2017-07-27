/* eslint-disable import/no-duplicates, import/first */
import NavSimpleExample from './NavSimpleExample';
import navSimpleExampleSrc from '!raw-loader!./NavSimpleExample';
import NavCollapseExample from './NavCollapseExample';
import navCollapseExampleSrc from '!raw-loader!./NavCollapseExample';
import NavComplexExample from './NavComplexExample';
import navComplexExampleSrc from '!raw-loader!./NavComplexExample';
import NavDrawerExample from './NavDrawerExample';
import navDrawerExampleSrc from '!raw-loader!./NavDrawerExample';
import PatternExample from './PatternExample';
import patternExampleSrc from '!raw-loader!./PatternExample';
import NavThemedExample from './NavThemedExample';
import navThemedExampleSrc from '!raw-loader!./NavThemedExample';
import FocusedTaskExample from './FocusedTaskExample';
import navFocusedTaskExample from '!raw-loader!./FocusedTaskExample';
/* eslint-enable import/no-duplicates, import/first */

const examples = [
  {
    title: 'Example of Pattern',
    Component: PatternExample,
    src: patternExampleSrc,
  },
  {
    title: 'Simple Navigation',
    Component: NavSimpleExample,
    src: navSimpleExampleSrc,
    type: 'navTakeover',
  },
  {
    title: 'Collapsible Navigation',
    Component: NavCollapseExample,
    src: navCollapseExampleSrc,
    type: 'navTakeover',
  },
  {
    title: 'Navigation with Drawer',
    Component: NavDrawerExample,
    src: navDrawerExampleSrc,
    type: 'navTakeover',
  },
  {
    title: 'Themed Navigation',
    Component: NavThemedExample,
    src: navThemedExampleSrc,
    type: 'navTakeover',
  },
  {
    title: 'Complex Navigation',
    Component: NavComplexExample,
    src: navComplexExampleSrc,
    type: 'navTakeover',
  },
  {
    title: 'Focused Task',
    Component: FocusedTaskExample,
    src: navFocusedTaskExample,
    type: 'navTakeover',
  },
];

export default examples;
