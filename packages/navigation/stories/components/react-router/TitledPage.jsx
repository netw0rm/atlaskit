import Lorem from 'react-lorem-component';
import React, { PropTypes, PureComponent } from 'react';
import PageNavigation from './PageNavigation';
import Page from '../HtmlPage';

export default class TitledPage extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
  }

  render() {
    return (
      <Page
        content={
          <div>
            <h1>{this.props.title}</h1>
            <Lorem count="30" />
          </div>
        }
      >
        <PageNavigation />
      </Page>
    );
  }
}
