import { dropdownMaxWidth } from './consts';

export default dropdown => (dropdown.mode === 'standard' ? `${dropdownMaxWidth}px` : 'none');
