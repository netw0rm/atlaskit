export default function dropdownPositionedToSide(dropdown) {
  return dropdown.position.indexOf('left') === 0 || dropdown.position.indexOf('right') === 0;
}
