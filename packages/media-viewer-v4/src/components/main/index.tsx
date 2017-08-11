import * as React from 'react';
import Navigation from './navigation';
import Overlay from './overlay';
import {Wrapper, ViewerWrapper} from './styled';

interface Item {
  name: string;
}

interface MainProps {
  item?: Item;
  canGoPrev?: boolean;
  canGoNext?: boolean;
  onGoPrev?: () => void;
  onGoNext?: () => void;
  children?: JSX.Element;
}

interface MainState {
}

export class Main extends React.PureComponent<MainProps, MainState> {

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
      <Overlay name={'hello'}/>
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
