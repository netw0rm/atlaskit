import React, { PureComponent, PropTypes } from 'react';
import styled from 'styled-components';
import { AtlassianLogo } from '@atlaskit/logo';
import ChevronDownIconIcon from '@atlaskit/icon/glyph/chevron-down';
import {
  akColorB400,
  akColorN0,
  akTypographyMixins,
} from '@atlaskit/util-shared-styles';
import { foundationLargeWidth, gridSize, setAnchorStates } from './util/style';
import HeaderLinks from './HeaderLinks';
import HeaderSearch from './HeaderSearch';
// import LogIn from './LogIn';

const headerHeight = gridSize * 11;

/* eslint-disable no-confusing-arrow */
const PrimaryFullWidthWrapper = styled.div`
  background-color: ${akColorB400};
  height: auto;
  padding: 0 ${gridSize}px;
  position: relative;
  width: 100%;

  @media screen and (min-width: ${foundationLargeWidth}) {
    height: ${headerHeight}px;
  }
`;
/* eslint-enable no-confusing-arrow */

const Row = styled.div`
  height: 100%;
`;

const Column = styled.div`
  align-items: baseline;
  color: ${akColorN0};
  display: flex;
  height: 100%;

  ${setAnchorStates`
    color: inherit;
  `}
`;

const Title = styled.h1`
  ${akTypographyMixins.h700}
  margin-top: ${gridSize * 4}px;
  padding-right: ${gridSize * 2}px;

  ${setAnchorStates`
    text-decoration: none;
    white-space: nowrap;
  `}
`;

/* eslint-disable no-confusing-arrow */
const ScreenHeightWrapper = styled.div`
  height: ${props => props.isOpen ? '100vh' : `${headerHeight}px`};
  overflow: hidden;
  transition: height 0.5s;
`;
/* eslint-enable no-confusing-arrow */

const Dropdown = styled.div`
  height: calc(100% - ${headerHeight}px + 1px);
`;

const StyledDiv = styled.div`
  position: relative;
  top: ${gridSize}px;
`;

// TODO RAD-26 Ask Atlaskit team why @atlaskit/logo doesn't properly align on the baseline.
const StyledAnchor = styled.a`
  position: relative;
  top: ${gridSize}px;
`;

const MobileTitle = styled.span`
  ${akTypographyMixins.h700}
  display: inline;
  font-size: 20px;
  margin: ${gridSize * 4}px ${gridSize}px;

  ${setAnchorStates`
    text-decoration: none;
  `}
`;

const SecondaryFullWidthWrapper = styled.div`
  background-color: #F1F2F6;
  height: 100%;
  width: 100%;
  padding: ${gridSize}px;
`;

const SecondaryLink = styled.a`
  color: white;

  &:hover {
    color: white;
    text-decoration: underline !important;
  }
`;

const SecondaryLinksWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 45px;

  & > * {
    margin-left: ${gridSize * 2}px;
  }

  & > *:first-child {
    margin-left: 0;
  }
`;

export class Header extends PureComponent {
  static propTypes = {
    children: PropTypes.element,
    logoHref: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    titleHref: PropTypes.string.isRequired,
    primaryLinks: PropTypes.arrayOf(PropTypes.shape({
      href: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      onExpand: PropTypes.func,
      selected: PropTypes.bool,
    })),
    secondaryLinks: PropTypes.arrayOf(PropTypes.shape({
      href: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })),
    submenuId: PropTypes.string,
  };

  static defaultProps = {
    primaryLinks: [],
    secondaryLinks: [],
  };

  constructor(...args) {
    super(...args);
    this.state = {
      isDropdownOpen: false,
      isSubmenuOpen: false,
    };
  }

  toggleDropdown = () => {
    this.setState({
      isDropdownOpen: !this.state.isDropdownOpen,
    });
  };

  _renderLinks(linkStyle) {
    const isPrimary = linkStyle === 'primary';
    return (
      <Row className="row collapse">
        <Column className="columns">
          <HeaderLinks
            links={isPrimary ? this.props.primaryLinks : this.props.secondaryLinks}
            linkStyle={linkStyle}
            screen="small"
            toggleId={this.props.submenuId}
          />
        </Column>
      </Row>
    );
  }

  _renderOffCanvasWrapper() {
    const mainNavigation = (
      <Row>
        <PrimaryFullWidthWrapper>
          {this._renderLinks('primary')}
        </PrimaryFullWidthWrapper>
        <SecondaryFullWidthWrapper>
          {this._renderLinks('secondary')}
        </SecondaryFullWidthWrapper>
      </Row>
    );

    return (
      <Dropdown className="off-canvas-wrapper">
        <Row className="off-canvas-wrapper-inner row collapse" data-off-canvas-wrapper>
          <div
            className="off-canvas-absolute position-right is-transition-push"
            data-position="right"
            data-off-canvas
            id={this.props.submenuId}
          >
            {this.props.children}
          </div>
          <Row className="off-canvas-content row collapse" data-off-canvas-content>
            {mainNavigation}
          </Row>
        </Row>
      </Dropdown>
    );
  }

  _renderSmallScreenView() {
    const hasLinks = this.props.primaryLinks.length > 0 || this.props.secondaryLinks.length > 0;
    const displayChevron = hasLinks && !this.state.isDropdownOpen;

    return (
      <ScreenHeightWrapper className="hide-for-large" isOpen={this.state.isDropdownOpen}>
        <PrimaryFullWidthWrapper>
          <Row className="row collapse">
            <Column className="columns" onClick={hasLinks ? this.toggleDropdown : null}>
              <StyledDiv>
                <AtlassianLogo collapseTo="icon" />
              </StyledDiv>
              <MobileTitle>{this.props.title}</MobileTitle>
              { displayChevron ? <ChevronDownIconIcon size="small" label="Expand menu" /> : null }
            </Column>
          </Row>
        </PrimaryFullWidthWrapper>

        {this._renderOffCanvasWrapper()}
      </ScreenHeightWrapper>
    );
  }

  _renderDesktopView() {
    return (
      <PrimaryFullWidthWrapper className="show-for-large">
        <Row className="row">
          <Column className="columns large-12">
            <StyledAnchor href={this.props.logoHref}>
              <AtlassianLogo collapseTo="icon" />
            </StyledAnchor>
            <Title><a href={this.props.titleHref}>{this.props.title}</a></Title>
            <HeaderLinks links={this.props.primaryLinks} linkStyle="primary" />
            <SecondaryLinksWrapper>
              <HeaderSearch />
              <SecondaryLink href={'/docs/'}>All docs</SecondaryLink>

            </SecondaryLinksWrapper>
          </Column>
        </Row>
      </PrimaryFullWidthWrapper>
    );
  }

  render() {
    return (
      <div>
        { this._renderDesktopView() }
        { this._renderSmallScreenView() }
      </div>
    );
  }
}

export default Header;
