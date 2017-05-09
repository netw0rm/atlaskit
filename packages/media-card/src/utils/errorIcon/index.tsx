import * as React from 'react';
import {Component} from 'react';
import WarningIcon from '@atlaskit/icon/glyph/editor/warning';
import Icon from '@atlaskit/icon';

import {ErrorIconWrapper} from './styled';

export class ErrorIcon extends Component<{}, {}> {
  render() {
    return <ErrorIconWrapper className={'error-icon'}>
             <Icon glyph={WarningIcon} label="Error" size="small"/>
           </ErrorIconWrapper>
    ;
  }
}
