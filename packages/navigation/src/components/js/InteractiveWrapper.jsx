import React, { PureComponent, PropTypes } from 'react';
import styled from 'styled-components';

const InvisibleButton = styled.button`
  align-items: inherit;
  background: none;
  border: none;
  box-sizing: content-box;
  color: inherit;
  cursor: pointer;
  display: inline;
  font: inherit;
  height: 100%;
  line-height: normal;
  padding: 0;
  text-align: inherit;
  width: 100%;
`;

export default class InteractiveWrapper extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    href: PropTypes.string,
    linkComponent: PropTypes.func,
    onClick: PropTypes.func,
    onMouseDown: PropTypes.func,
  }
  render() {
    const {
      children,
      href,
      linkComponent: LinkComponent,
      onClick,
      onMouseDown,
    } = this.props;

    return href ? (
      <LinkComponent
        onMouseDown={onMouseDown}
        onClick={onClick}
        href={href}
      >
        {children}
      </LinkComponent>
    ) : (
      <InvisibleButton
        onClick={onClick}
        onMouseDown={onMouseDown}
      >
        {children}
      </InvisibleButton>
    );
  }
}
