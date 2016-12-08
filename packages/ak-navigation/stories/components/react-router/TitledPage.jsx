import Lorem from 'react-lorem-component';
import React, { PropTypes, PureComponent } from 'react';
import PageNavigation from './PageNavigation';
import Page from '../Page';

// eslint-disable-next-line react/prefer-stateless-function
export default class TitledPage extends PureComponent {
  static get propTypes() {
    return {
      title: PropTypes.string,
    };
  }

  render() {
    return (
      <Page>
        <PageNavigation />
        <div>
          <h1>{this.props.title}</h1>
          <Lorem count="30" />
        </div>
      </Page>
    );
  }
}
