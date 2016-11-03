import { dropdownMaxHeight } from './consts';

export default dropdown => (dropdown.appearance === 'standard' ? `${dropdownMaxHeight}px` : 'none');
