import React, { PropTypes, PureComponent } from 'react';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import Container, { Description, DismissButton, Icon, Content, Title, Header } from '../styled/Flag';
import Actions from './FlagActions';

export default class Flag extends PureComponent {
  static propTypes = {
    /** Optional array of clickable actions to be shown at the bottom of the flag */
    actions: PropTypes.arrayOf(PropTypes.shape({
      content: PropTypes.node,
      onClick: PropTypes.func,
    })),
    /** The secondary content shown below the flag title */
    description: PropTypes.node,
    /** The icon displayed in the top-left of the flag. Should be an instance of `ak-icon` */
    icon: PropTypes.element.isRequired,
    /** A unique identifier used for rendering and onDismissed callbacks */
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    /** Private, do not use. */
    isDismissAllowed: PropTypes.bool,
    /** Private, do not use. Use the FlagGroup onDismissed handler. */
    onDismissed: PropTypes.func,
    /** Set to `true` to programatically dismiss the flag. */
    shouldDismiss: PropTypes.bool,
    /** The bold text shown at the top of the flag */
    title: PropTypes.string.isRequired,
  };

  static defaultProps = {
    actions: [],
    isDismissAllowed: false,
    onDismissed: () => {},
    shouldDismiss: false,
  }

  componentWillUpdate(nextProps) {
    if (this.props.shouldDismiss === false && nextProps.shouldDismiss === true) {
      this.dismissFlag();
    }
  }

  dismissFlag = () => {
    if (this.props.isDismissAllowed) {
      this.props.onDismissed(this.props.id);
    }
  }

  render() {
    const { actions, description, icon, isDismissAllowed, title } = this.props;

    return (
      <Container role="alert" tabIndex="0">
        <span>
          <Icon>{icon}</Icon>
        </span>
        <Content>
          <Header>
            <Title>{title}</Title>
            {isDismissAllowed ? (
              <DismissButton type="button" onClick={this.dismissFlag}>
                <CrossIcon label="Dismiss flag" />
              </DismissButton>
            ) : null}
          </Header>
          {description ? (
            <Description>{description}</Description>
          ) : null}
          <Actions actions={actions} />
        </Content>
      </Container>
    );
  }
}
