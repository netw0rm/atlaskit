import { dropdownMaxHeight } from './consts';

export default dropdown => (dropdown.appearance !== 'tall' ? `${dropdownMaxHeight}px` : 'none');
