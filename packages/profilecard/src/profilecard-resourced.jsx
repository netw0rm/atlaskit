import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import AkProfilecardStatic from './profilecard';

export default class ProfilecardResourced extends PureComponent {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    cloudId: PropTypes.string.isRequired,
    containerAri: PropTypes.string,
    giverId: PropTypes.string,
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
    this.increaseKarma = this.increaseKarma.bind(this);
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

  increaseKarma() {
    if (!this.props.karmaClient) {
      return;
    }

    this.setState({
      isLoading: true,
      hasError: false,
    });

    const { cloudId, userId, giverId, containerAri } = this.props;
    this.props.karmaClient.increaseKarma(cloudId, userId, giverId, containerAri)
      .then(
        res => this.handleIncreaseKarmaSuccess(res),
        err => this.handleIncreaseKarmaError(err),
      )
      .catch(err => this.handleIncreaseKarmaError(err));
  }

  handleClientSuccess(res) {
    if (!this._isMounted) { return; }

    const data = res[0] ? res[0] : undefined;
    const karma = res[1] ? res[1].amount : undefined;

    this.setState({
      isLoading: false,
      hasError: false,
      data: data,
      karma: karma,
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

  handleIncreaseKarmaSuccess(res) {
    if (!this._isMounted) { return; }
    this.setState({
      isLoading: false,
      hasError: false,
      karma: res.amount,
    });
  }

  handleIncreaseKarmaError(err) {
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
      karma: this.state.karma,
      ...this.state.data,
    };

    if (this.props.karmaClient && this.props.increaseKarma) {
      newProps['increaseKarma'] = this.props.increaseKarma;
    }

    return (
      <AkProfilecardStatic {...newProps} actions={this.props.actions} />
    );
  }
}
