import { dropdownMaxWidth } from './consts';

export default dropdown => (dropdown.appearance === 'standard' ? `${dropdownMaxWidth}px` : 'none');
