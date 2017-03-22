import React, { PropTypes, PureComponent } from 'react';
import Navigation, {
  AkContainerHeader,
  AkContainerItem,
} from '@atlaskit/navigation';

// eslint-disable-next-line react/prefer-stateless-function
export default class Flag extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return (
      <div
        style={{
          boxSizing: 'border-box',
          display: 'flex',
          height: '100vh',
          overflowY: 'auto',
          padding: 32,
        }}
      >
        <Navigation
          containerHeader={
            <a href="#foo">
              <AkContainerHeader
                text="AtlasCat"
              />
            </a>
          }
        >
          <a>
            <AkContainerItem text="Test page" />
          </a>
          <a>
            <AkContainerItem text="Item with an icon" />
          </a>
        </Navigation>
        {this.props.children}
      </div>
    );
  }
}
