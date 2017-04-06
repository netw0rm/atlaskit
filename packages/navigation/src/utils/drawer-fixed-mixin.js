import styled from 'styled-components';
import { widths, transformTransition } from './drawer-style-variables';

export default function drawerFixedMixin(isOpen, width) {
  return Component => styled(Component)`
    transition: ${transformTransition};
    transform: ${isOpen ? 'translateX(0)' : `translateX(calc(-1 * (${widths[width].offScreenTranslateX})))`}
  `;
}
