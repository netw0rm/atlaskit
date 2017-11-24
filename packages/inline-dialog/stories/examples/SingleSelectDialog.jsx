import React from 'react';
import InlineDialog from '@atlaskit/inline-dialog';
import SingleSelect from '@atlaskit/single-select';

class SingleSelectDialog extends React.PureComponent {
  state = {
    isDialogOpen: true,
  };

  dialogClosed = () => {
    this.setState(prevState => ({ isDialogOpen: !prevState.isDialogOpen }));
  };

  render() {
    const items = [
      {
        items: [
          {
            value: 'A',
            content: 'A',
          },
        ],
      },
    ];
    const content = (
      <div>
        <h1>Hello World</h1>
        <SingleSelect
          items={items}
        />
      </div>
    );
    return (
      <InlineDialog
        content={content}
        isOpen={this.state.isDialogOpen}
        onClose={this.dialogClosed}
      />
    );
  }
}

export default SingleSelectDialog;
