import { dropdownMaxWidth } from './consts';

export default dropdown => (dropdown.mode === 'standart' ? `${dropdownMaxWidth}px` : 'none');
