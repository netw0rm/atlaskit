import * as React from 'react';
import Editor from '../../../editor';
import ChromeCollapsed from '../../../ui/ChromeCollapsed';

export interface Props {
  placeholder?: string;
  children?: any;
  onFocus?: (e) => void;
  isExpanded?: boolean;

  onExpand?: () => void;
}

export interface State {
  shouldTriggerExpandEvent?: boolean;
}

export default class CollapsedEditor extends React.Component<Props, State> {

  defaultProps = {
    onFocus: () => {},
    onExpand: () => {}
  };

  editorComponent?: Editor;

  componentWillReceiveProps(nextProps, nextState) {
    if (!this.props.isExpanded && nextProps.isExpanded) {
      this.setState({ shouldTriggerExpandEvent: true });
    }
  }

  componentDidUpdate() {
    if (this.state.shouldTriggerExpandEvent && this.editorComponent) {
      this.setState({ shouldTriggerExpandEvent: false }, this.props.onExpand);
    }
  }

  handleEditorRef = (editorRef?: Editor, editorRefCallback?: any) => {
    if (editorRefCallback && typeof editorRefCallback === 'function') {
      editorRefCallback(editorRef);
    }
    this.editorComponent = editorRef;
  }

  render() {
    const child = React.Children.only(this.props.children);
    if (child.type !== Editor) {
      throw new Error('Expected child to be of type `Editor`');
    }

    if (!this.props.isExpanded) {
      return <ChromeCollapsed onFocus={this.props.onFocus} text={this.props.placeholder} />;
    }

    return React.cloneElement(child, {
      ref: editorComponent => this.handleEditorRef(editorComponent, (child as any).ref)
    });
  }
}
