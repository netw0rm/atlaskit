import dropdownPositionedToSide from './dropdownPositionedToSide';

const grid = 4;
const itemHeight = grid * 7;
const dropdownMaxHeight = (itemHeight * 9.5); // ( item height * 9.5 items) - by design

export default dropdown => (dropdownPositionedToSide(dropdown) ? 'auto' : `${dropdownMaxHeight}px`);
