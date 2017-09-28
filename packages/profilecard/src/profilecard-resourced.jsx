import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import AkProfilecardStatic from './profilecard';

export default class ProfilecardResourced extends PureComponent {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    cloudId: PropTypes.string.isRequired,
    actions: PropTypes.arrayOf(PropTypes.shape({
      callback: PropTypes.func,
      id: PropTypes.string,
      label: PropTypes.string,
    })),
    resourceClient: PropTypes.shape({
      getProfile: PropTypes.func,
      getCachedProfile: PropTypes.func,
      makeRequest: PropTypes.func,
    }).isRequired,
    karmaClient: PropTypes.shape({
      getKarma: PropTypes.func,
      increaseKarma: PropTypes.func,
    }),
    analytics: PropTypes.func,
  }

  static defaultProps = {
    actions: [],
  }

  constructor(props) {
    super(props);

    this._isMounted = false;

    this.state = {
      isLoading: false,
      hasError: false,
      error: null,
      data: {},
    };

    this.clientFetchProfile = this.clientFetchProfile.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
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

  componentWillUnmount() {
    this._isMounted = false;
  }

  clientFetchProfile() {
    const { cloudId, userId } = this.props;

    this.setState({
      isLoading: true,
      hasError: false,
      data: {},
    });

    const profilePromise = this.props.resourceClient.getProfile(cloudId, userId);
    const karmaPromise = this.props.karmaClient ? this.props.karmaClient.getKarma(cloudId, userId) : Promise.resolve(null);
    Promise.all([profilePromise, karmaPromise])
    .then(
      res => this.handleClientSuccess(res),
      err => this.handleClientError(err),
    )
    .catch(err => this.handleClientError(err));
  }

  handleClientSuccess(res) {
    if (!this._isMounted) { return; }

    let data = {};
    if (res[0]) {
      data = { ...data, ...res[0] };
    }
    if (res[1]) {
      data = { ...data, ...res[1] };
    }

    this.setState({
      isLoading: false,
      hasError: false,
      data: data,
    });
  }

  handleClientError(err) {
    if (!this._isMounted) { return; }
    this.setState({
      isLoading: false,
      hasError: true,
      error: err,
    });
  }

  render() {
    const newProps = {
      isLoading: this.state.isLoading,
      hasError: this.state.hasError,
      errorType: this.state.error,
      clientFetchProfile: this.clientFetchProfile,
      analytics: this.props.analytics,
      ...this.state.data,
    };

    return (
      <AkProfilecardStatic {...newProps} actions={this.props.actions} />
    );
  }
}
