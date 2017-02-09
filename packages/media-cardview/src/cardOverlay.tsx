import * as React from 'react';
import {Component, MouseEvent} from 'react';
import * as bytes from 'bytes';

import * as styles from './styles.less';
import {ProgressBar} from './progressBar';
import {MediaTypes, Actions} from '@atlaskit/media-domain';
import {Dropdown} from './dropdown';
import {FileIcon} from './fileIcon';
import {ErrorIcon} from './errorIcon';

export interface CardOverlayProps {
  mediaType: MediaTypes.MediaType;
  mediaName?: string;
  mediaSize?: number;

  selectable?: boolean;
  selected?: boolean;

  progress?: number;

  error?: string;
  onRetry?: Actions.CardAction;

  menuActions?: Array<Actions.CardAction>;
}

export interface CardOverlayState {
  isMenuExpanded: boolean;
}

export class CardOverlay extends Component<CardOverlayProps, CardOverlayState> {
  private _clickDetector: (e: Event) => void;

  constructor(props: CardOverlayProps) {
    super(props);

    this.state = {
      isMenuExpanded: false
    };
  }

  static get defaultProps() {
    const menuActions: Array<Actions.CardAction> = [];

    return {
      menuActions
    };
  }

  render() {
    const active = (typeof this.props.progress === 'number');

    let classNames: Array<string> = [styles['overlay']];

    if (this.props.error) {
      classNames.push(styles['error']);
    } else {
      if (active) {
        classNames.push(styles['active']);
      }

      if (this.props.selectable) {
        classNames.push(styles['selectable']);
      }

      if (this.props.selected) {
        classNames.push(styles['selected']);
      }

      if (this.props.mediaType === 'image') {
        classNames.push(styles['image']);
      }

      if (this.props.mediaType === 'video') {
        classNames.push(styles['video']);
      }

      if (typeof this.props.progress === 'number') {
        classNames.push(styles['inProgress']);
      }
    }

    if (this.state.isMenuExpanded) {
      classNames.push(styles['active']);
    }

    return (
      <div className={classNames.join(' ')}>
        <div className={styles['topRow']}>
          {this.errorLine()}
          <div className={styles['title']}>
            {this.props.mediaName}
          </div>
          {this.tickBox()}
        </div>
        <div className={styles['bottomRow']}>
          <div className={styles['leftColumn']}>
            {this.bottomLeftColumn()}
          </div>
          <div className={styles['rightColumn']}>
            {this.moreBtn()}
          </div>
        </div>
        {this.dropdown()}
      </div>
    );
  }

  errorLine() {
    const error = this.props.error;
    return error && (
      <div className={styles['errorLine']}>
        <div className={styles['errorIcon']}>
          <ErrorIcon />
        </div>
        <div className={styles['errorMessage']}>{this.props.error}</div>
      </div>
    );
  }

  tickBox() {
    return this.props.selectable && (<div className={styles['tickbox']} />);
  }

  bottomLeftColumn() {
    if (this.props.error) {
      const onRetry = this.props.onRetry;
      if (!onRetry) {
        return null;
      }

      const retryMessage = onRetry.label || 'Try again';
      const retryHandler = (event: MouseEvent<HTMLSpanElement>) => {
        // We need to prevent the card's onClick to be invoked
        event.stopPropagation();
        event.preventDefault();
        onRetry.handler(undefined, event.nativeEvent);
      };

      return (
        <div className={styles['retry']}>
          <span onClick={retryHandler}>{retryMessage}</span>
        </div>
      );
    } else {
      const fileSize = this.props.mediaSize && bytes.format(this.props.mediaSize, {unitSeparator: ' '});
      return (
        <div>
          <div className={styles['metadata']}>
            <div className={styles['fileTypeIcon']}>
              <FileIcon mediaType={this.props.mediaType} />
            </div>
            <div className={styles['fileSize']}>{fileSize}</div>
          </div>
          <ProgressBar progress={this.props.progress} />
        </div>
      );
    }
  }

  moreBtn() {
    const actions = this.props.menuActions || [];
    if (!actions.length) {
      return null;
    }

    if (actions.length === 1 && actions[0].type === Actions.CardActionType.delete) {
      const deleteAction = actions[0];
      return (
        <div className={styles['deleteBtn']} onClick={this.removeBtnClick(deleteAction.handler)} />
      );
    }

    const moreBtnClasses = [styles['moreBtn']];
    if (this.state.isMenuExpanded) {
      moreBtnClasses.push(styles['active']);
    }

    return (
      <div className={moreBtnClasses.join(' ')} onClick={this.moreBtnClick.bind(this)} />
    );
  }

  dropdown() {
    if (!this.state.isMenuExpanded) {
      return null;
    }

    return (
      <div className={styles['dropdownWrapper']} onClick={this.dropdownClick}>
        <Dropdown items={this.props.menuActions} />
      </div>
    );
  }

  removeBtnClick(handler: Actions.CardEventHandler) {
    return (e: MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      handler();
    };
  }

  dropdownClick(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
  }

  moreBtnClick(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (this.state.isMenuExpanded) {    //we should remove handlers
      document.removeEventListener('click', this._clickDetector);
    } else {    //we should add handlers on clicking outside of element
      this._clickDetector = this.newClickDetector.bind(this);
      document.addEventListener('click', this._clickDetector);
    }

    this.setState({
      isMenuExpanded: !this.state.isMenuExpanded
    });
  }

  newClickDetector(e: Event) {
    this.setState({
      isMenuExpanded: false
    });

    document.removeEventListener('click', this._clickDetector);
  }
}