import { storiesOf } from '@kadira/storybook';
import React, { PureComponent } from 'react';

// import avatar1 from 'file!./data/1.jpg';

import { name } from '../package.json';
import DirectionWrapper from '../src/components/DirectionWrapper';

// have some more space around the profilecard
const canvasStyle = {
  padding: '30px',
  boxSizing: 'border-box',
  height: '100%',
};

class ResizingBox extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      height: '96px',
    };

    this.interval = null;
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        height: this.state.height === '96px' ? '288px' : '96px',
      });
    }, 750);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div
        style={{
          width: '360px',
          height: this.state.height,
          background: '#0052CC',
          transition: 'height 0.25s ease',
        }}
      />
    );
  }
}

storiesOf(`${name} internal`, module)
  .add('DirectionWrapper Bottom', () => (
    <div style={canvasStyle}>
      <DirectionWrapper position="bottom left">
        <ResizingBox />
      </DirectionWrapper>
    </div>
  ))
  .add('DirectionWrapper Top', () => (
    <div style={canvasStyle}>
      <div style={{ position: 'relative', top: '100%' }}>
        <DirectionWrapper position="top left">
          <ResizingBox />
        </DirectionWrapper>
      </div>
    </div>
  ));
