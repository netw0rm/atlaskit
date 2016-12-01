import React, { PureComponent, PropTypes } from 'react';

import ProfileCard from './profilecard';
import LoadingMessage from './components/LoadingMessage';
import ErrorMessage from './components/ErrorMessage';
import ProfileClient from './api/profile-client';

/**
 * @description Create instances of the ProfilecardResourced component in a React context.
 * @class ProfilecardResourced
 */
export default class ProfilecardResourced extends PureComponent {
  static propTypes = {
    /**
     * @memberof ProfilecardResourced
     * @instance
     * @type {string}
     */
    userId: PropTypes.string.isRequired,
    /**
     * @memberof ProfilecardResourced
     * @instance
     * @type {string}
     */
    cloudId: PropTypes.string.isRequired,
    /**
     * @description Defining the action buttons on the card.
     * Array of one or more action objects with `label` and `callback` keys.
     * `label` defines the button text while `callback` is invoked when
     * the button is clicked.
     * @memberof ProfilecardResourced
     * @instance
     * @type {array}
     * @example [{label: 'Chat', callback: () => { ... }}, ... ]
     */
    actions: React.PropTypes.arrayOf(React.PropTypes.shape({
      callback: React.PropTypes.func,
      label: React.PropTypes.string,
    })),
    /**
     * @memberof ProfilecardResourced
     * @instance
     * @type {string}
     */
    apiEndpoint: React.PropTypes.string.isRequired,

    resourceClient: React.PropTypes.shape({
      fetch: React.PropTypes.func,
    }),
  }

  static defaultProps = {}

  constructor(props) {
    super(props);

    this.profileClient = props.resourceClient || new ProfileClient({
      url: props.apiEndpoint,
    });

    this.state = {
      isLoading: false,
      hasError: false,
    };
  }

  componentDidMount() {
    this.clientFetchProfile();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.userId !== prevProps.userId ||
      this.props.userId !== prevProps.userId
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
    const Element = () => {
      if (this.state.hasError) {
        return (<ErrorMessage />);
      }

      if (this.state.isLoading) {
        return (<LoadingMessage />);
      }

      return (
        <ProfileCard {...this.state.data} actions={this.props.actions} />
      );
    };

    return (<Element />);
  }
}
