import React, { PropTypes, PureComponent } from 'react';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import Container, { Description, DismissButton, Icon, Content, Title, Header } from '../styled/Flag';
import Actions from './FlagActions';

export default class Flag extends PureComponent {
  static propTypes = {
    actions: PropTypes.arrayOf(PropTypes.shape({
      content: PropTypes.node,
      onClick: PropTypes.func,
    })),
    description: PropTypes.node,
    icon: PropTypes.element.isRequired,
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    isDismissAllowed: PropTypes.bool,
    onDismissed: PropTypes.func,
    title: PropTypes.string.isRequired,
  };

  static defaultProps = {
    actions: [],
    isDismissAllowed: false,
    onDismissed: () => {},
  }

  flagDismissed = () => {
    this.props.onDismissed(this.props.id);
  }

  render() {
    const { actions, description, icon, isDismissAllowed, title } = this.props;

    return (
      <Container role="alert" tabIndex="0">
        <Icon>{icon}</Icon>
        <Content>
          <Header>
            <Title>{title}</Title>
            {isDismissAllowed ? (
              <DismissButton type="button" onClick={this.flagDismissed}>
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
