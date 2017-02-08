import React, { PureComponent, PropTypes } from 'react';
import styled, { ThemeProvider } from 'styled-components';

const Wrapper = styled.div`
  min-height: 100%;
  width: 100%;
`;

const NavigationAndContent = styled.div`
  min-height: 100%;
  width: 100%;
`;

const Navigation = styled.div`
  float: left;
`;

const PageContent = styled.div`
  height: 100%;
  width: 100%;
`;

export default class Page extends PureComponent {
  static displayName = 'AkPage';

  static propTypes = {
    children: PropTypes.node,
    navigation: PropTypes.node,
  }

  render = () => (
    <Wrapper>
      <ThemeProvider theme={{}}>
        <NavigationAndContent>
          <Navigation>
            {this.props.navigation}
          </Navigation>
          <PageContent>
            {this.props.children}
          </PageContent>
        </NavigationAndContent>
      </ThemeProvider>
    </Wrapper>
  );
}
