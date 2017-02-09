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
  height: 52px; /* TODO: Josh this needs to be aware of the banner height */
  position: relative;
  width: 100%;
  z-index: 2;
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
  z-index: 3;
`;

const PageContent = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: auto;
  position: relative;
  z-index: 1;
  width: calc(100% - 284px); /* TODO: Josh this needs to be aware of the nav width */
`;

export default class Page extends PureComponent {
  static displayName = 'AkPage';

  static propTypes = {
    children: PropTypes.node,
    navigation: PropTypes.node,
    banner: PropTypes.node,
  }

  render = () => (
    <ThemeProvider theme={{}}>
      <Wrapper>
        <BannerContainer>
          <Banner>
            {this.props.banner}
          </Banner>
        </BannerContainer>
        <NavigationAndContent>
          <Navigation>
            {this.props.navigation}
          </Navigation>
          <PageContent>
            {this.props.children}
          </PageContent>
        </NavigationAndContent>
      </Wrapper>
    </ThemeProvider>
  );
}
