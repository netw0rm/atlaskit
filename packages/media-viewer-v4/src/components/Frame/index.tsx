import * as React from 'react';
import Navigation from './components/Navigation';
import ItemInfo from './components/ItemInfo';
import {Wrapper, ViewerWrapper} from './styled';

interface Item {
  name: string;
}

interface FrameProps {
  item?: Item;
  canGoPrev?: boolean;
  canGoNext?: boolean;
  onGoPrev?: () => void;
  onGoNext?: () => void;
  children?: JSX.Element;
}

interface FrameState {
}

export class Frame extends React.PureComponent<FrameProps, FrameState> {

  static defaultProps = {
    canGoLeft: false,
    canGoRight: false
  };

  renderNav() {
    const {canGoPrev, canGoNext, onGoPrev, onGoNext} = this.props;
    return (
      <Navigation
        canGoPrev={canGoPrev}
        canGoNext={canGoNext}
        onGoPrev={onGoPrev}
        onGoNext={onGoNext}
      />
    );
  }

  renderInfo() {
    const {item} = this.props;

    if (!item) {
      return null;
    }

    return (
      <ItemInfo name={'hello'}/>
    );
  }

  render() {
    const {children} = this.props;
    return (
      <Wrapper>
        {this.renderNav()}
        {/* <MiniModeView
          isVisible={isMiniModeActive}
          onClose={onMiniModeChange}
          list={list}
          context={context}
          onCardClick={this.onCardClick}
        /> */}
        {this.renderInfo()}
        <ViewerWrapper>
        {children}
        </ViewerWrapper>
      </Wrapper>
    );
  }

}
