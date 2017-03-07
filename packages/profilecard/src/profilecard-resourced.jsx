import React, { PureComponent, PropTypes } from 'react';

import AkProfilecardStatic from './profilecard';
import ProfileClient from './api/profile-client';

export default class ProfilecardResourced extends PureComponent {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    cloudId: PropTypes.string.isRequired,
    actions: React.PropTypes.arrayOf(React.PropTypes.shape({
      callback: React.PropTypes.func,
      label: React.PropTypes.string,
    })),
    apiEndpoint: React.PropTypes.string,

    resourceClient: React.PropTypes.shape({
      fetch: React.PropTypes.func,
    }),
  }

  static defaultProps = {
    actions: [],
  }

  constructor(props) {
    super(props);

    this.profileClient = props.resourceClient || new ProfileClient({
      url: props.apiEndpoint,
    });

    this.state = {
      isLoading: false,
      hasError: false,
      data: {},
    };

    this.clientFetchProfile = this.clientFetchProfile.bind(this);
  }

  componentDidMount() {
    this.clientFetchProfile();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.userId !== prevProps.userId ||
      this.props.cloudId !== prevProps.cloudId
    ) {
      this.clientFetchProfile();
    }
  }

  clientFetchProfile() {
    this.setState({
      isLoading: true,
      hasError: false,
      data: {},
    });

    const options = {
      cloudId: this.props.cloudId,
      userId: this.props.userId,
    };

    this.profileClient.fetch(options)
    .then(
      res => this.handleClientSuccess(res),
      err => this.handleClientError(err),
    )
    .catch(err => this.handleClientError(err));
  }

  handleClientSuccess(res) {
    this.setState({
      isLoading: false,
      hasError: false,
      data: res,
    });
  }

  handleClientError(err) {
    this.setState({
      isLoading: false,
      hasError: true,
      error: err,
    });
  }

  render() {
    const newProps = Object.assign(this.state.data, {
      isLoading: this.state.isLoading,
      hasError: this.state.hasError,
      clientFetchProfile: this.clientFetchProfile,
    });
    return (
      <AkProfilecardStatic {...newProps} actions={this.props.actions} />
    );
  }
}
