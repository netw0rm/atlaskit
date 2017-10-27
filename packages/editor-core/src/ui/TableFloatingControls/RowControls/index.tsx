import * as React from 'react';
import { Component } from 'react';
import { toolbarSize } from '../styles';
import {
  RowInner,
  RowContainer,
  RowControlsButtonWrap,
  HeaderButton,
} from './styles';
import InsertRowButton from './InsertRowButton';
import { EditorView } from 'prosemirror-view';

export interface Props {
  editorView: EditorView;
  tableElement: HTMLElement;
  isSelected: (row: number) => boolean;
  selectRow: (row: number) => void;
  insertRow: (row: number) => void;
  hoverRow: (row: number, view: EditorView) => void;
  resetHoverSelection: (view: EditorView) => void;
}

export default class RowControls extends Component<Props, any> {
  render () {
    const { editorView } = this.props;
    const tbody = this.props.tableElement.querySelector('tbody')!;
    const rows = tbody.getElementsByTagName('tr');
    const nodes: any = [];
    const tableWidth = this.props.tableElement.offsetWidth;

    for (let i = 0, len = rows.length; i < len; i++) {
      nodes.push(
        <RowControlsButtonWrap
          key={i}
          className={this.props.isSelected(i) ? 'active' : ''}
          style={{ height: (rows[i] as HTMLElement).offsetHeight + 1 }}
        >
          {/* tslint:disable:jsx-no-lambda */}
          <HeaderButton
            onClick={() => this.props.selectRow(i)}
            onMouseOver={() => this.props.hoverRow(i, editorView)}
            onMouseOut={() => this.props.resetHoverSelection(editorView)}
          />
          {/* tslint:enable:jsx-no-lambda */}
          <InsertRowButton
            insertRow={this.props.insertRow}
            index={i + 1}
            lineMarkerWidth={tableWidth + toolbarSize}
          />
        </RowControlsButtonWrap>
      );
    }

    return (
      <RowContainer>
        <RowInner>{nodes}</RowInner>
      </RowContainer>
    );
  }
}
