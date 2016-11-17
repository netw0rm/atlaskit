import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Resizer.less';

export default class Resizer extends Component {
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
    this.props.startResizeHandler();
    this.setState({ startScreenX: e.screenX });
    document.addEventListener('mousemove', this.mouseMoveHandler);
    document.addEventListener('mouseup', this.mouseUpHandler);
    e.preventDefault();
  }

  mouseUpHandler(e) {
    this.props.endResizeHandler(e.screenX - this.state.startScreenX);
    document.removeEventListener('mousemove', this.mouseMoveHandler);
    document.removeEventListener('mouseup', this.mouseUpHandler);
  }

  mouseMoveHandler(e) {
    this.props.resizeHandler(e.screenX - this.state.startScreenX);
  }

  render() {
    return (
      <div
        onMouseDown={this.mouseDownHandler}
        className={classNames(styles.locals.resizer)}
      >
        <style>{styles.toString()}</style>
      </div>
    );
  }
}

Resizer.propTypes = {
  startResizeHandler: PropTypes.func,
  resizeHandler: PropTypes.func,
  endResizeHandler: PropTypes.func,
};

Resizer.defaultProps = {
  startResizeHandler: () => {},
  resizeHandler: () => {},
  endResizeHandler: () => {},
};
