/* tslint:disable: variable-name */
import * as React from 'react';
import styled from 'styled-components';
import {minSquareCardDimensions, maxSquareCardDimensions} from '../../../../utils/cardDimensions';

// TODO: this needs to be composed inside the component (so we're not duplicating the width calcs)
// but can probably be reused across multiple components

const A = styled.a`
  display: block;
  min-width: ${minSquareCardDimensions.width}px;
  max-width: ${maxSquareCardDimensions.width}px;
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`;

export interface AnchorProps {
  href?: string;
  onClick?: () => void;
}

export class Anchor extends React.Component<AnchorProps, {}> {

    handleClick = (event) => {
      event.preventDefault();
      const {onClick} = this.props;
      if (onClick) {
        onClick();
      }
    }

    render() {
      const {href, children} = this.props;
      return (
        <A className="link-wrapper" href={href} onClick={this.handleClick}>{children}</A>
      );
    }
  }
