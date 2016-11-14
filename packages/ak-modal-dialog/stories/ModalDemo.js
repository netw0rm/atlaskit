import React from 'react';
import reactify from 'akutil-react';
import AkButton from 'ak-button';
import Lorem from 'react-lorem-component';
import { default as WebComponent, events } from '../src';

const ReactModal = reactify(WebComponent);
const ReactButton = reactify(AkButton);

export default class ModalDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  componentDidMount() {
    this.outerEl.addEventListener(events.blanketClicked, () => {
      this.setState({ isOpen: false });
    });
  }

  render() {
    return (
      <div ref={(elem) => { this.outerEl = elem; }}>
        <ReactButton
          appearance="primary"
          onClick={() => this.setState({ isOpen: true })}
        >Open ze modal!</ReactButton>
        <p>Once the modal is open, click the background to close it.</p>
        <ReactModal open={this.state.isOpen}>
          <div is slot="header">New issue</div>
          <div is slot="footer">
            <ReactButton appearance="primary">Create issue</ReactButton>
          </div>
          <div>
            <Lorem count="1" />
          </div>
        </ReactModal>
      </div>
    );
  }
}
