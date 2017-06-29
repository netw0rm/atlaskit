import styled from 'styled-components';
import CustomComponentProxy from '../components/CustomComponentProxy';
import { getStyles } from '../styled/Avatar';

export default {
  custom: () => {
    // Override pseudo-state specificity.
    // This is necessary because we don't know what DOM element the custom component will render.
    const component = styled(CustomComponentProxy)`&,&:hover,&:active,&:focus{${getStyles}}`;
    component.displayName = 'StyledCustomComponent';
    return component;
  },
  button: () => {
    const component = styled.button`${getStyles}`;
    component.displayName = 'StyledButton';
    return component;
  },
  link: () => {
    // Target the <a> here to override a:hover specificity.
    const component = styled.a`a&{ ${getStyles} }`;
    component.displayName = 'StyledLink';
    return component;
  },
  span: () => {
    const component = styled.span`${getStyles}`;
    component.displayName = 'StyledSpan';
    return component;
  },
};
