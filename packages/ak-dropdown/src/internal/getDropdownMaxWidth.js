import { dropdownMaxWidth } from './consts';

export default dropdown => (dropdown.dropWidth === 'standart' ? `${dropdownMaxWidth}px` : 'none');
