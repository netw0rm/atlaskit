import styled from 'styled-components';
import CustomComponentProxy from '../components/CustomComponentProxy';
import { getInnerStyles } from '../styled/utils';

export default {
  custom: () => {
    // Override pseudo-state specificity.
    // This is necessary because we don't know what DOM element the custom component will render.
    const component = styled(CustomComponentProxy)`&,&:hover,&:active,&:focus{${getInnerStyles}}`;
    component.displayName = 'StyledCustomComponent';
    return component;
  },
  button: () => {
    const component = styled.button`${getInnerStyles}`;
    component.displayName = 'StyledButton';
    return component;
  },
  link: () => {
    // Target the <a> here to override a:hover specificity.
    const component = styled.a`a&{ ${getInnerStyles} }`;
    component.displayName = 'StyledLink';
    return component;
  },
  span: () => {
    const component = styled.span`${getInnerStyles}`;
    component.displayName = 'StyledSpan';
    return component;
  },
};
