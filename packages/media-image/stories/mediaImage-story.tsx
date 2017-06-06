import { storiesOf } from '@kadira/storybook';
import * as React from 'react';
import { Component } from 'react';
import {MediaImage} from '../src';
import { name } from '../package.json';
import { genericFileId, defaultServiceHost, defaultClientId, defaultCollectionName, StoryBookTokenProvider } from '@atlaskit/media-test-helpers';

const apiConfig = {
  clientId: defaultClientId,
  token: '',
  serviceHost: defaultServiceHost
};

export interface WrapperProps {

}

export interface WrapperState {
  token: string;
}

export class Wrapper extends Component<WrapperProps, WrapperState> {
  constructor(props) {
    super(props);

    this.state = {
      token: ''
    };
  }

  componentDidMount() {
    StoryBookTokenProvider.tokenProvider(defaultCollectionName).then(token => {
      this.setState({token});
    });
  }

  render() {
    const {token} = this.state;
    apiConfig.token = token;

    return (
      <MediaImage id={genericFileId.id} mediaApiConfig={apiConfig} collectionName={defaultCollectionName} />
    );
  }
}


storiesOf(name, module)
  .add('Default', () => (
    <Wrapper />
  ));
