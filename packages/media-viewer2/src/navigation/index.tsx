import * as React from 'react';
import { PureComponent } from 'react';
import ArrowLeft from '@atlaskit/icon/glyph/arrow-left';
import ArrowRight from '@atlaskit/icon/glyph/arrow-right';
import { ArrowLeftWrapper, ArrowRightWrapper } from './styled';

export interface Props {
  onPrev: () => {},
  onNext: () => {}
}

export interface State { }

export class Navigation extends PureComponent<Props, State> {

  onLeftArrow() {
    this.props.onPrev && this.props.onPrev();
  }

  onRightArrow() {
    this.props.onNext && this.props.onNext();
  }

  render() {
    return (
      <div>
        <ArrowLeftWrapper>
          <ArrowLeft label="Previous" onClick={this.onLeftArrow.bind(this)} />
        </ArrowLeftWrapper>

        <ArrowRightWrapper>
          <ArrowRight label="Next" onClick={this.onRightArrow.bind(this)}  />
        </ArrowRightWrapper>
      </div>
    );
  }
}
