import * as React from 'react';
import {Component, MouseEvent} from 'react';
import * as bytes from 'bytes';
import styles from 'style!./styles.less';
import {ProgressBar} from './progressBar';
import {MediaTypes} from '@atlaskit/media-domain';
import {Dropdown} from './dropdown';
import {Actions} from '@atlaskit/media-domain';
import {FileIcon} from './foo/fileIcon';// MEDIA-FIX

export interface CardOverlayProps {
  mediaType: MediaTypes.MediaType;
  mediaName?: string;
  mediaSize?: number;

  selectable?: boolean;
  selected?: boolean;

  progress?: number;

  menuActions?: Array<Actions.CardAction>;
}

export interface CardOverlayState {
  isMenuExpanded: boolean;
}

export class CardOverlay extends Component<CardOverlayProps, CardOverlayState> {
  constructor(props: CardOverlayProps) {
    super(props);

    this.state = {
      isMenuExpanded: false
    };
  }

  private _clickDetector: (e: Event) => void;


  static get defaultProps() {
    const menuActions: Array<Actions.CardAction> = [];

    return {
      menuActions
    };
  }

  render() {
    const active = (typeof this.props.progress === 'number');

    let classNames: Array<string> = [styles['overlay']];
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

    if (this.state.isMenuExpanded) {
      classNames.push(styles['active']);
    }

    const fileSize = this.props.mediaSize && bytes.format(this.props.mediaSize, {unitSeparator: ' '});

    return (
      <div className={classNames.join(' ')}>
        <div className={styles['topRow']}>
          <div className={styles['title']}>
            {this.props.mediaName}
          </div>
          {this.tickBox()}
        </div>
        <div className={styles['bottomRow']}>
          <div className={styles['leftColumn']}>
            <div className={styles['metadata']}>
              <div className={styles['fileTypeIcon']}>
                <FileIcon mediaType={this.props.mediaType} />
              </div>
              <div className={styles['fileSize']}>{fileSize}</div>
            </div>
            <ProgressBar progress={this.props.progress} />
          </div>
          <div className={styles['rightColumn']}>
            {this.moreBtn()}
          </div>
        </div>
        {this.dropdown()}
      </div>
    );
  }

  tickBox() {
    return this.props.selectable && (<div className={styles['tickbox']} />);
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

    if (this.state.isMenuExpanded) {    // we should remove handlers
      document.removeEventListener('click', this._clickDetector);
    } else {    // we should add handlers on clicking outside of element
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
