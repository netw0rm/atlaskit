import React, { PureComponent, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Button from '@atlaskit/button';
import AKTooltip from '@atlaskit/tooltip';
import classnames from 'classnames';
import { locals } from './styles.less';
import { itemTruncateWidth } from './internal/constants';

const { item, itemButton, truncated } = locals;

export default class BreadcrumbsItem extends PureComponent {
  static propTypes = {
    href: PropTypes.string,
    iconBefore: PropTypes.element,
    iconAfter: PropTypes.element,
    text: PropTypes.string,
  }

  static defaultProps = {
    href: '#',
  }

  constructor() {
    super();
    this.state = {
      hasOverflow: false,
    };
  }

  componentDidMount() {
    this.updateOverflow();
  }

  componentWillReceiveProps() {
    // Reset the state
    this.setState({ hasOverflow: false });
  }

  componentDidUpdate() {
    this.updateOverflow();
  }

  updateOverflow() {
    if (!this.button) return false;
    // We need to find the DOM node for the button component in order to measure its size.
    const el = ReactDOM.findDOMNode(this.button); // eslint-disable-line react/no-find-dom-node
    const overflow = el.clientWidth >= itemTruncateWidth;
    if (overflow !== this.state.hasOverflow) {
      this.setState({ hasOverflow: overflow });
    }
    return overflow;
  }

  renderButton = () => (
    <Button
      className={itemButton}
      appearance="link"
      iconAfter={this.props.iconAfter}
      iconBefore={this.props.iconBefore}
      spacing="compact"
      href={this.props.href}
      ref={el => (this.button = el)}
    >
      {this.props.text}
    </Button>
  );

  renderButtonWithTooltip = () => (
    <AKTooltip
      description={this.props.text}
      position="bottom"
    >
      {this.renderButton()}
    </AKTooltip>
  );

  render() {
    const itemClasses = classnames(item, {
      [truncated]: this.state.hasOverflow,
    });
    return (
      <div className={itemClasses}>
        {this.state.hasOverflow
          ? this.renderButtonWithTooltip()
          : this.renderButton()
        }
      </div>
    );
  }
}
