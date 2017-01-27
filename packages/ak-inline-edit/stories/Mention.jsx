import React, { PureComponent, PropTypes } from 'react';
import AkAvatar from 'ak-avatar';

const wrapperStyle = {
  display: 'flex',
};

export default class extends PureComponent {
  propTypes = {
    mention: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }).isRequired,
  }
  render = () => (
    <div style={wrapperStyle}>
      <AkAvatar size="small" src={this.props.mention.avatarUrl} />
      <span>{this.props.mention.name}</span>
    </div>
  )
}
