import React, { PureComponent } from 'react';
import InlineEditor from '@atlaskit/inline-edit';
import SingleLineTextInput from '@atlaskit/input';
import Select from '@atlaskit/single-select';

const selectItems = [{
  heading: 'Cities',
  items: [
    { content: 'Sydney', value: 'sydney' },
    { content: 'Canberra', value: 'canberra' },
  ],
}];

export default class InlineEditorExamples extends PureComponent {
  state = {
    textInputVal: '',
  }

  render() {
    return (
      <div>
        <div>
          <InlineEditor
            label="Inline Edit Field"
            editView={<SingleLineTextInput
              isEditing
              isInitiallySelected
              value={this.state.textInputVal}
              onChange={e => this.setState({ textInputVal: e.target.value })}
            />}
            readView={<SingleLineTextInput isEditing={false} value={this.state.textInputVal || 'Field value'} />}
            onConfirm={() => {}}
            onCancel={() => console.log('cancel')}
          />
        </div>
        <div>
          <InlineEditor
            label="Inline Edit select field"
            readView={this.state.selectInputVal ? this.state.selectInputVal.item.content : 'Select Field'}
            disableEditViewFieldBase
            onConfirm={() => console.log('Edit confirmed')}
            onCancel={() => console.log('cancel')}
            editView={
              <Select
                items={selectItems}
                onSelected={e => this.setState({ selectInputVal: e })}
                isDefaultOpen
                shouldFitContainer
                shouldFocus
                defaultSelected={
                  this.state.selectInputVal
                  ? this.state.selectInputVal.item
                  : undefined
                }
              />
            }
          />
        </div>
        <div>
          <InlineEditor
            label="Waiting State"
            isWaiting
            editView={<SingleLineTextInput
              isEditing
              isInitiallySelected
            />}
            readView={<SingleLineTextInput isEditing={false} value={'This will be styled as disabled'} />}
            onConfirm={() => {}}
            onCancel={() => console.log('cancel')}
          />
        </div>
        <div>
          <InlineEditor
            label="Invalid State"
            isInvalid
            editView={<SingleLineTextInput
              isEditing
              isInitiallySelected
            />}
            readView={<SingleLineTextInput isEditing={false} value={'This will be styled as invalid'} />}
            onConfirm={() => {}}
            onCancel={() => console.log('cancel')}
          />
        </div>
      </div>
    );
  }
}
