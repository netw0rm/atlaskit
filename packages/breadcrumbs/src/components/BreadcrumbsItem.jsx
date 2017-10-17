// @flow
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import AKTooltip from '@atlaskit/tooltip';
import ItemWrapper from '../styled/BreadcrumbsItem';
import { Button, ShortButton } from '../styled/Button';
import Separator from '../styled/Separator';
import type { ElementType } from '../types';

type Props = {|
  /** Whether this item will be followed by a separator. */
  hasSeparator?: boolean,
  /** The url or path which the breadcrumb should act as a link to. */
  href?: string,
  /** An icon to display before the breadcrumb. */
  iconBefore?: ElementType,
  /** An icon to display after the breadcrumb. */
  iconAfter?: ElementType,
  /** Handler to be called on click. **/
  onClick?: (Event) => mixed,
  /** The text to appear within the breadcrumb as a link. */
  text?: string,
  /** The maximum width in pixels that an item can have before it is truncated.
  If this is not set, truncation will only occur when it cannot fit alone on a
  line. If there is no truncationWidth, tooltips are not provided on truncation. */
  truncationWidth?: number,
  target?: '_blank' | '_parent' | '_self' | '_top',
|}

export default class BreadcrumbsItem extends PureComponent {
  props: Props // eslint-disable-line react/sort-comp
  button: ?ElementType
  StyledButton = Button

  static defaultProps = {
    hasSeparator: false,
    href: '#',
  }

  state = { hasOverflow: false }

  componentDidMount() {
    this.StyledButton = this.props.truncationWidth ? ShortButton : Button;
    this.updateOverflow();
  }

  componentWillReceiveProps() {
    // Reset the state
    this.setState({ hasOverflow: false });
  }

  componentDidUpdate() {
    this.StyledButton = this.props.truncationWidth ? ShortButton : Button;
    this.updateOverflow();
  }

  updateOverflow() {
    const { truncationWidth } = this.props;
    const button = this.button;
    if (truncationWidth && button) {
      // We need to find the DOM node for the button component in order to measure its size.
      const el = ReactDOM.findDOMNode(button); // eslint-disable-line react/no-find-dom-node
      const overflow = el.clientWidth >= truncationWidth;
      if (overflow !== this.state.hasOverflow) {
        this.setState({ hasOverflow: overflow });
      }
      return overflow;
    }
    return false;
  }

  renderButton = () => {
    const StyledButton = this.StyledButton;
    const {
      href, iconAfter, iconBefore, onClick, target, text, truncationWidth,
    } = this.props;

    return (
      <StyledButton
        truncationWidth={truncationWidth}
        appearance="subtle-link"
        iconAfter={iconAfter}
        iconBefore={iconBefore}
        onClick={onClick}
        spacing="none"
        href={href}
        target={target}
        ref={(el: ElementType) => (this.button = el)}
      >
        {text}
      </StyledButton>
    );
  }

  renderButtonWithTooltip = () => (
    <AKTooltip
      description={this.props.text}
      position="bottom"
    >
      {this.renderButton()}
    </AKTooltip>
  );

  render() {
    return (
      <ItemWrapper>
        {this.state.hasOverflow && this.props.truncationWidth
          ? this.renderButtonWithTooltip()
          : this.renderButton()
        }
        {this.props.hasSeparator
          ? <Separator>/</Separator>
          : null
        }
      </ItemWrapper>
    );
  }
}
