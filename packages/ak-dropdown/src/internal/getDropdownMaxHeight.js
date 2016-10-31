import { dropdownMaxHeight } from './consts';

export default dropdown => (dropdown.mode === 'standart' ? `${dropdownMaxHeight}px` : 'none');
