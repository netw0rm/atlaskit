import { storiesOf } from '@kadira/storybook';
import React, { PureComponent } from 'react';
import { FieldText } from 'ak-field-text';


import InlineEdit from '../src';
import { name } from '../package.json';
import styles from '../src/shadow.less';

const formStyle = {
  padding: '20px',
  backgroundColor: 'white',
  width: '500px',
};

class GenericInlineEdit extends PureComponent {
  static propTypes = {
    label: React.PropTypes.string,
    value: React.PropTypes.string,
    focused: React.PropTypes.bool,
  }

  static defaultProps = {
    label: 'label for field-base',
  }

  constructor(props) {
    super(props);
    this.state = {
      viewValue: props.value || 'Your content here!',
      editValue: props.value || 'Your content here!',
    };
  }

  onCancel = () => this.setState({
    editValue: this.state.viewValue,
  });
  onConfirm = () => this.setState({
    viewValue: this.state.editValue,
  })
  onChange = e => this.setState({
    editValue: e.target.value,
  })

  render() {
    return (
      <InlineEdit
        className={styles.locals.akFieldBase}
        label={this.props.label}
        focused={this.props.focused}
        onCancelEdit={this.onCancel}
        onConfirmEdit={this.onConfirm}
        view={this.state.viewValue}
      >
        <FieldText
          label={this.props.label}
          focused={this.props.focused}
          value={this.state.editValue}
          onChange={this.onChange}
        />
      </InlineEdit>
    );
  }
}

storiesOf(name, module)
  .add('a simple ak-field-base', () => (
    <div>
      <form action="" style={formStyle}>
        <div>
          <p>
            This shows the base functionality provided by ak-field-base. It has two slots; editmode
            and viewmode. Hovering over the field whilst in view mode should show the edit icon and
            clicking should enter edit mode. Edit mode will display whatever content is in.
          </p>
        </div>
        <GenericInlineEdit />
      </form>
    </div>
  ));
