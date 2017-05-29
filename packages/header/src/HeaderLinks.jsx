import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import {
  akColorN0,
  akColorN400A,
  akTypographyMixins,
} from '@atlaskit/util-shared-styles';
import ChevronRightIconIcon from '@atlaskit/icon/glyph/chevron-right';
import {
  foundationLargeWidth,
  gridSize,
  setAnchorStates,
} from './util/style';

const borderBottomStyle = `2px solid ${akColorN0}`;

const marginChooser = (isSmallScreen, isPrimary) => {
  if (isSmallScreen) {
    return isPrimary ? '0' : `${gridSize}px 0 ${gridSize}px 0`;
  }
  return `${gridSize * 2}px`;
};

const Links = styled.ul`
  display: inline-block;
  margin: 0 ${gridSize}px ${gridSize}px ${gridSize}px;
  width: inherit;

  @media screen and (min-width: ${foundationLargeWidth}) {
    width: auto;
    display: flex;
    margin: ${gridSize * 2}px;
    width: auto;
  }
`;

/* eslint-disable no-confusing-arrow */
const LinkItem = styled.li`
  ${akTypographyMixins.h500}
  font-weight: ${props => (props.selected && !props.isSmallScreen) ? '600' : 'inherit'};
  letter-spacing: 0.01em;
  list-style-type: none;
  margin: ${props => marginChooser(props.isSmallScreen, props.isPrimary)};

  ${setAnchorStates`
    text-decoration: none;
  `}
  a {
    border-bottom: ${props => (props.selected && !props.isSmallScreen) ? `${borderBottomStyle}` : 'none'};
    color: ${props => props.isPrimary ? 'inherit' : `${akColorN400A} !important`};
    padding: ${props => (props.isSmallScreen && props.isPrimary) ? `${gridSize * 2}px 0 ${gridSize * 2}px 0` : '0'};
    white-space: nowrap;

    &:hover {
      border-bottom: ${props => props.isSmallScreen ? 'none' : `${borderBottomStyle}`};
    }
  }
`;
/* eslint-enable no-confusing-arrow */

/* eslint-disable no-confusing-arrow */
const StyledAnchor = styled.a`
  align-items: center;
  border-top: ${props => props.isPrimary ? '1.5px solid rgba(255, 255, 255, 0.2)' : 'none'};
  display: ${props => props.isPrimary ? 'flex' : 'inline'};
  justify-content: space-between;
  position: relative;

  @media screen and (min-width: ${foundationLargeWidth}) {
    border-top: none;
  }
`;
/* eslint-enable no-confusing-arrow */

export default class HeaderLinks extends PureComponent {
  static propTypes = {
    links: PropTypes.arrayOf(PropTypes.shape({
      href: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      onExpand: PropTypes.func,
      selected: PropTypes.bool,
    })).isRequired,
    linkStyle: PropTypes.oneOf(['primary', 'secondary']),
    screen: PropTypes.oneOf(['small', 'medium', 'large']),
    toggleId: PropTypes.string,
  };

  static defaultProps = {
    linkStyle: 'primary',
    screen: 'large',
  };

  render() {
    const isSmallScreen = this.props.screen === 'small';
    const isPrimary = this.props.linkStyle === 'primary';

    const links = this.props.links.map((link) => {
      const linkItemProps = {
        key: link.label,
        onClick: link.onExpand,
        selected: link.selected,
        isSmallScreen,
        isPrimary,
      };
      const isExpandableMobileLink = !!link.onExpand && isSmallScreen;
      let href = link.href;
      if (isExpandableMobileLink) {
        linkItemProps['data-toggle'] = this.props.toggleId;
        href = null;
      }

      return (
        <LinkItem {...linkItemProps}>
          <StyledAnchor href={href} isPrimary={isPrimary}>
            <span>{ link.label }</span>
            { isExpandableMobileLink ? <ChevronRightIconIcon size="small" label={`Expand ${link.label} menu`} /> : null }
          </StyledAnchor>
        </LinkItem>
      );
    });
    return (<Links>{ links }</Links>);
  }
}
