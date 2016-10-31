import { dropdownMaxHeight } from './consts';

export default dropdown => (dropdown.dropHeight === 'standart' ? `${dropdownMaxHeight}px` : 'none');
