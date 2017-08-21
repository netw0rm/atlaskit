import React, { Component } from 'react';
import Modal from '@atlaskit/modal-dialog';
import LayerManager from '../../src';

const longcontent = (
  <div>
    <p>Macaroon cupcake powder dragée liquorice fruitcake cookie sesame snaps cake. Cheesecake gingerbread cupcake soufflé. Powder sweet roll caramels cake toffee toffee toffee donut fruitcake. Soufflé muffin jelly beans sugar plum chocolate bar cake jelly. Gummi bears sesame snaps tart cotton candy chupa chups tootsie roll wafer biscuit. Sugar plum caramels lollipop sesame snaps cookie icing pie biscuit candy. Fruitcake chocolate bar ice cream candy gummi bears jujubes wafer pie. Halvah carrot cake pastry soufflé pudding. Marshmallow marshmallow candy canes cotton candy danish jujubes. Sweet cake candy bonbon cake jujubes wafer pudding. Cake biscuit ice cream lemon drops powder jujubes liquorice tiramisu oat cake. Macaroon carrot cake cookie liquorice chocolate cake chocolate cake cake chocolate bar.</p>
    <p>Sugar plum danish pastry. Cotton candy fruitcake powder. Donut sweet halvah cookie. Muffin icing caramels donut sesame snaps macaroon halvah gummi bears chocolate cake. Cheesecake jelly beans ice cream bonbon. Jelly-o dragée chocolate bar. Ice cream chocolate donut. Fruitcake apple pie jujubes gingerbread dragée ice cream tiramisu. Dragée gingerbread oat cake powder gummies muffin jelly beans bear claw. Cheesecake chocolate pie macaroon sweet. Marzipan tart chocolate cake candy. Marshmallow powder chocolate wafer liquorice.</p>
  </div>
);

export default class ExampleSingleModal extends Component {
  state = { modalIsOpen: false }

  componentDidMount() { this._isMounted = true; }
  componentWillUnmount() { this._isMounted = false; }

  toggleModal = modalIsOpen => this._isMounted && this.setState({ modalIsOpen })
  openModal = () => this.toggleModal(true)
  closeModal = () => this.toggleModal(false)

  render() {
    const { modalIsOpen } = this.state;

    return (
      <LayerManager>
        <div style={{ padding: '1em' }}>
          <h1>With a LayerManager</h1>
          <p>
            <button onClick={this.openModal}>
              Open modal
            </button>
          </p>

          <Modal
            isOpen={modalIsOpen}
            onDialogDismissed={this.closeModal}
            title="Modal Title"
            actions={[
              { text: 'Close Modal', onClick: this.closeModal },
              { text: 'No Action', onClick: () => {} },
            ]}
          >
            <p>Modal Body</p>
          </Modal>
        </div>
      </LayerManager>
    );
  }
}
