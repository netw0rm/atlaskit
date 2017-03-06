import React, { PureComponent, PropTypes } from 'react';

import AkProfilecardStatic from './profilecard';

export default class ProfilecardResourced extends PureComponent {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    cloudId: PropTypes.string.isRequired,
    actions: PropTypes.arrayOf(PropTypes.shape({
      callback: PropTypes.func,
      label: PropTypes.string,
    })),
    resourceClient: PropTypes.shape({
      getCachedProfile: PropTypes.func,
      request: PropTypes.func,
      fetch: PropTypes.func,
    }).isRequired,
  }

  static defaultProps = {
    actions: [],
  }

  constructor(props) {
    super(props);

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

  updateData(dataObject) {
    const newData = { ...this.state.data, ...dataObject };

    this.setState({
      data: newData,
    });
  }

  updatePresence(presence) {
    const data = this.state.data;
    const newData = { ...data, presence };

    this.setState({
      data: newData,
    });
  }

  clientFetchProfile() {
    const options = {
      cloudId: this.props.cloudId,
      userId: this.props.userId,
    };

    const cache = this.props.resourceClient.getCachedProfile(options);

    if (cache) {
      this.handleClientSuccess(cache);
      return;
    }

    this.setState({
      isLoading: true,
      hasError: false,
      data: {},
    });

    this.props.resourceClient.fetch(options)
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
