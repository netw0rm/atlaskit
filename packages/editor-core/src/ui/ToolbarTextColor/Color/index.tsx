import * as React from 'react';
import { PureComponent } from 'react';
import * as styles from './styles';
import Icon from '@atlaskit/icon';
import EditorDoneIcon from '@atlaskit/icon/glyph/editor/done';
import { akColorN0 } from '@atlaskit/util-shared-styles';

export interface Props {
  value: string;
  label: string;
  tabIndex?: number;
  isSelected?: boolean;
  onClick: (value: string) => void;
}

export default class Color extends PureComponent<Props, undefined> {
  render() {
    const { tabIndex, value, label, isSelected } = this.props;
    return (
      <span className={styles.buttonWrapper}>
        <button
          onClick={this.onClick}
          onMouseDown={this.onMouseDown}
          tabIndex={tabIndex}
          className={`${styles.button} ${isSelected ? 'selected' : ''}`}
          title={label}
          style={{ backgroundColor: value }}
        >
          {isSelected &&
            <Icon
              primaryColor={akColorN0}
              label="Selected"
              glyph={EditorDoneIcon}
            />
          }
        </button>
      </span>
    );
  }

  onMouseDown = (e) => {
    e.preventDefault();
  }

  onClick = (e) => {
    const { onClick, value } = this.props;
    e.preventDefault();
    onClick(value);
  }
}
