import { dropdownMaxHeight } from './consts';

export default dropdown => (dropdown.mode === 'standard' ? `${dropdownMaxHeight}px` : 'none');
