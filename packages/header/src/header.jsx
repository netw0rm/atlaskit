import React, { PureComponent, PropTypes } from 'react';
import { AtlassianLogo } from '@atlaskit/logo';
import ChevronDownIconIcon from '@atlaskit/icon/glyph/chevron-down';
import HeaderLinks from './HeaderLinks';
import HeaderSearch from './HeaderSearch';
import LogIn from './LogIn';
import {
  HeaderWrapper,
  PrimaryFullWidthWrapper,
  Row,
  Column,
  Title,
  ScreenHeightWrapper,
  Dropdown,
  StyledDiv,
  StyledAnchor,
  MobileTitle,
  SecondaryFullWidthWrapper,
  SecondaryLink,
  SecondaryLinksWrapper,
} from './styled';

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
              <LogIn />
            </SecondaryLinksWrapper>
          </Column>
        </Row>
      </PrimaryFullWidthWrapper>
    );
  }

  render() {
    return (
      <HeaderWrapper>
        { this._renderDesktopView() }
        { this._renderSmallScreenView() }
      </HeaderWrapper>
    );
  }
}

export default Header;
