import React, { PureComponent, PropTypes } from 'react';
import styled, { ThemeProvider } from 'styled-components';

const Wrapper = styled.div`
  min-height: 100%;
  width: 100%;
`;

const NavigationAndContent = styled.div`
  min-height: 100%;
  width: 100%;
  display: flex;
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
          {this.props.navigation}
          <PageContent>
            {this.props.children}
          </PageContent>
        </NavigationAndContent>
      </ThemeProvider>
    </Wrapper>
  );
}
