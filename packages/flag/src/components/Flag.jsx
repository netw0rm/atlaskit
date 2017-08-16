// @flow
import React, { PureComponent } from 'react';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import ChevronUpIcon from '@atlaskit/icon/glyph/chevron-up';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import Container, {
  Description,
  DismissButton,
  Icon,
  Content,
  Title,
  Header,
} from '../styled/Flag';
import Expander from './Expander';
import Actions from './FlagActions';
import { flagFocusRingColor } from '../theme';
import type { ActionsType, AppearanceTypes, ChildrenType, ElementType, FunctionType } from '../types';

export const DEFAULT_APPEARANCE = 'normal';

type Props = {
  /** Array of clickable actions to be shown at the bottom of the flag. For flags where appearance
    * is 'normal', actions will be shown as links. For all other appearance values, actions will
    * shown as buttons.
    */
  actions?: ActionsType,
  /** Makes the flag appearance bold. Setting this to anything other than 'normal' hides the
    * dismiss button.
    */
  appearance?: AppearanceTypes,
  /** The secondary content shown below the flag title */
  description?: ChildrenType,
  /** The icon displayed in the top-left of the flag. Should be an instance of `@atlaskit/icon`.
    * Your icon will receive the appropriate default color, which you can override by wrapping the
    * icon in a containing element with CSS `color` set to your preferred icon color.
    */
  icon: ElementType,
  /** A unique identifier used for rendering and onDismissed callbacks. */
  id: number | string,
  /** Private, do not use. */
  isDismissAllowed?: boolean,
  /** Private, do not use. Use the FlagGroup onDismissed handler. */
  onDismissed?: FunctionType,
  /** The bold text shown at the top of the flag. */
  title: string,
};

export default class Flag extends PureComponent {
  props: Props; // eslint-disable-line react/sort-comp
  static defaultProps = {
    actions: [],
    appearance: DEFAULT_APPEARANCE,
    isDismissAllowed: false,
  }

  state = { isExpanded: false }

  componentWillReceiveProps(nextProps: Props) {
    const { actions, description } = nextProps;
    if (this.isBold() && this.state.isExpanded && !description && !actions.length) {
      this.toggleExpand();
    }
  }

  dismissFlag = () => {
    if (this.props.isDismissAllowed && this.props.onDismissed) {
      this.props.onDismissed(this.props.id);
    }
  }

  isBold = () => this.props.appearance !== DEFAULT_APPEARANCE

  toggleExpand = () => {
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  renderToggleOrDismissButton = () => {
    const { appearance, description, actions, isDismissAllowed, onDismissed } = this.props;
    const isBold = this.isBold();
    if (
      !isDismissAllowed ||
      (!isBold && !onDismissed) ||
      (isBold && !description && !actions.length)
    ) {
      return null;
    }

    const ChevronIcon = this.state.isExpanded ? ChevronUpIcon : ChevronDownIcon;
    const ButtonIcon = isBold ? ChevronIcon : CrossIcon;
    const buttonLabel = isBold ? 'Toggle flag body' : 'Dismiss flag';
    const buttonAction = isBold ? this.toggleExpand : this.dismissFlag;

    return (
      <DismissButton
        appearance={appearance}
        focusRingColor={flagFocusRingColor(this.props)}
        onClick={buttonAction}
        type="button"
      >
        <ButtonIcon label={buttonLabel} size="small" />
      </DismissButton>
    );
  }

  renderBody = () => {
    const { actions, appearance, description } = this.props;
    const isExpanded = !this.isBold() || this.state.isExpanded;

    return (
      <Expander isExpanded={isExpanded}>
        {description && (
          <Description appearance={appearance}>
            {description}
          </Description>
        )}
        <Actions actions={actions} appearance={appearance} />
      </Expander>
    );
  }

  render() {
    const { appearance, icon, title } = this.props;
    const OptionalDismissButton = this.renderToggleOrDismissButton;
    const Body = this.renderBody;

    return (
      <Container appearance={appearance} role="alert" tabIndex="0">
        <Icon>{icon}</Icon>
        <Content>
          <Header>
            <Title appearance={appearance}>{title}</Title>
            <OptionalDismissButton />
          </Header>
          <Body />
        </Content>
      </Container>
    );
  }
}
