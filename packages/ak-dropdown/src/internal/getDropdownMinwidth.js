import dropdownPositionedToSide from './dropdownPositionedToSide';

// Width of the dropdown should be at least width of its trigger + 10px
const diffBetweenDropdownAndTrigger = 10;
const dropdownMinWidth = 150;

// min width of a dropdown should be more than width of the trigger (by design)
// max-width is controlled by css, everything that's exceeding its limit
// is ellipsed (by design, controlled by css)
export default (target, dropdown) => {
  const minWidth = dropdownPositionedToSide(dropdown) ? dropdownMinWidth :
  target.getBoundingClientRect().width + diffBetweenDropdownAndTrigger;
  return `${minWidth}px`;
};
