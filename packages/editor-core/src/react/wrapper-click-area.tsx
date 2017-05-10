import * as React from 'react';
import { PureComponent } from 'react';

export default class WrapperClickArea extends PureComponent<{}, {}> {
  private domElem: HTMLElement;

  render() {
    return (
      <div
        onClick={this.onClick}
        ref={this.handleRef}
      >
        {this.props.children}
      </div>
    );
  }

  private onClick = () => {
    this.domElem.classList.toggle('ProseMirror-selectednode');
  }

  private handleRef = (elem: HTMLElement) => {
    this.domElem = elem;
  }
}
