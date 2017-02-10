import React, { PureComponent, PropTypes } from 'react';
import styled from 'styled-components';

const InvisibleButton = styled.button`
  background: none;
  box-sizing: content-box;
  border: 0;
  color: inherit;
  cursor: pointer;
  display: inline;
  font: inherit;
  height: 100%;
  line-height: normal;
  overflow: visible;
  padding: 0;
  width: 100%;
  text-align: inherit;
  align-items: inherit;
`;

export default class InteractiveWrapper extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    href: PropTypes.href,
    linkComponent: PropTypes.func,
    onClick: PropTypes.func,
    onMouseDown: PropTypes.func,
  }
  render() {
    const {
      children,
      className,
      href,
      linkComponent,
      onClick,
      onMouseDown,
    } = this.props;

    const LinkComponent = linkComponent;
    return href ? (
      <LinkComponent
        onMouseDown={onMouseDown}
        onClick={onClick}
        href={href}
        className={className}
      >
        {children}
      </LinkComponent>
    ) : (
      <InvisibleButton
        className={className}
        onClick={onClick}
        onMouseDown={onMouseDown}
      >
        {children}
      </InvisibleButton>
    );
  }
}
