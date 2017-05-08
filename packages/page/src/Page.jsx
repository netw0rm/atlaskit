import React, { PureComponent, PropTypes } from 'react';
import styled, { ThemeProvider } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  width: 100%;
`;

const NavigationAndContent = styled.div`
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
`;

const BannerContainer = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: auto;
  transition: max-height 0.25s ease-in-out;
  max-height: ${props => (props.isBannerOpen ? 52 : 0)}px; /* 52 is line height (20) + 4*grid */
  position: relative;
  width: 100%;
  z-index: 3;
`;

const Banner = styled.div`
  position: fixed;
  width: 100%;
`;

const Navigation = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: auto;
  position: relative;
  max-height: 100%;
  z-index: 2;
`;

const PageContent = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: auto;
  position: relative;
  z-index: 1;
  width: calc(100% - ${props => props.navigationWidth}px);
`;

export default class Page extends PureComponent {
  static displayName = 'AkPage';

  static propTypes = {
    /** Component to be displayed at top of page component. */
    banner: PropTypes.node,
    /** The components to be displayed as the content of the page. Should be an
    @atlaskit/banner. */
    children: PropTypes.node,
    /** Set whether the banner component should be displayed. */
    isBannerOpen: PropTypes.bool,
    /** A component to be displayed to the side of the page component. Should
    be an @atlaskit/navigation component. */
    navigation: PropTypes.node,
    /** The width of the navigation bar in pixels. */
    navigationWidth: PropTypes.number,
  }

  static defaultProps = {
    isBannerOpen: false,
    navigationWidth: 0,
  }
  render() {
    return (
      <ThemeProvider theme={{}}>
        <Wrapper>
          {this.props.banner ? (
            <BannerContainer
              aria-hidden={this.props.isBannerOpen}
              isBannerOpen={this.props.isBannerOpen}
            >
              <Banner>
                {this.props.banner}
              </Banner>
            </BannerContainer>
          ) : null}
          <NavigationAndContent>
            <Navigation>
              {this.props.navigation}
            </Navigation>
            <PageContent navigationWidth={this.props.navigationWidth}>
              {this.props.children}
            </PageContent>
          </NavigationAndContent>
        </Wrapper>
      </ThemeProvider>
    );
  }
}
