import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from 'isomorphic-style-loader!../less/Resizer.less';

class Resizer extends Component {
  static get propTypes() {
    return {
      onResizeStart: PropTypes.func,
      onResize: PropTypes.func,
      onResizeEnd: PropTypes.func,
    };
  }
  static get defaultProps() {
    return {
      onResizeStart: () => {},
      onResize: () => {},
      onResizeEnd: () => {},
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      startScreenX: 0,
    };

    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);
  }
  mouseDownHandler(e) {
    this.props.onResizeStart();
    this.setState({ startScreenX: e.screenX });
    document.addEventListener('mousemove', this.mouseMoveHandler);
    document.addEventListener('mouseup', this.mouseUpHandler);
    e.preventDefault();
  }

  mouseUpHandler(e) {
    this.props.onResizeEnd(e.screenX - this.state.startScreenX);
    document.removeEventListener('mousemove', this.mouseMoveHandler);
    document.removeEventListener('mouseup', this.mouseUpHandler);
  }

  mouseMoveHandler(e) {
    this.props.onResize(e.screenX - this.state.startScreenX);
  }

  render() {
    return (
      <div
        onMouseDown={this.mouseDownHandler}
        className={styles.resizer}
      />
    );
  }
}

export default withStyles(styles)(Resizer);
