import * as React from 'react';
import { ChangeEvent, PureComponent } from 'react';

import ErrorIcon from '@atlaskit/icon/glyph/error';
import AkButton from '@atlaskit/button';
import AkFieldBase from '@atlaskit/field-base';
import Spinner from '@atlaskit/spinner';

import { customCategory } from '../../constants';
import { EmojiDescription, EmojiUpload } from '../../types';
import * as styles from './styles';
import Emoji from './Emoji';
import FileChooser from './FileChooser';

export interface OnUploadEmoji {
  (upload: EmojiUpload): void;
}

export interface Props {
  onUploadEmoji?: OnUploadEmoji;
  onUploadCancelled?: () => void;
  errorMessage?: string;
  initialUploadName?: string;
}

export enum UploadStatus {
  Waiting,
  Uploading,
  Error,
}

export interface State {
  previewImage?: string;
  name?: string;
  filename?: string;
  uploadStatus?: UploadStatus;
}

const disallowedNameChars = new Map([
  [':', ''],
  [' ', '_'],
]);

const maxNameLength = 50;

const toEmojiName = (uploadName: string): string => {
  const name = uploadName.split('_').join(' ');
  return `${name.substr(0, 1).toLocaleUpperCase()}${name.substr(1)}`;
};

const getNaturalImageSize = (dataURL: string): Promise<{ width: number, height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = dataURL;
    img.addEventListener('load', () => {
      resolve({
        width: img.naturalHeight,
        height: img.naturalWidth,
      });
    });
    img.addEventListener('error', reject);
  });
};

export default class EmojiUploadPicker extends PureComponent<Props, State> {

  state = {
    uploadStatus: UploadStatus.Waiting,
  } as State;

  constructor(props: Props) {
    super(props);
    if (props.errorMessage) {
      this.state.uploadStatus = UploadStatus.Error;
    }
    this.state.name = props.initialUploadName;
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.errorMessage) {
      this.setState({
        uploadStatus: UploadStatus.Error,
      });
    } else {
      if (this.state.uploadStatus === UploadStatus.Error) {
        this.setState({
          uploadStatus: UploadStatus.Waiting,
        });
      }
    }
  }

  private onNameChange = (event) => {
    let newName = event.target.value;
    // prevent / replace certain characters, allow others
    disallowedNameChars.forEach((replaceWith, exclude) => {
      newName = newName.split(exclude).join(replaceWith);
    });
    if (this.state.name !== newName) {
      this.setState({
        name: newName
      });
    }
  }

  private onAddEmoji = () => {
    const { onUploadEmoji } = this.props;
    const { filename, name, previewImage } = this.state;
    if (onUploadEmoji && filename && name && previewImage) {
      getNaturalImageSize(previewImage).then(size => {
        const { width, height } = size;
        onUploadEmoji({
          name: toEmojiName(name),
          shortName: `:${name}:`,
          filename,
          dataURL: previewImage,
          width,
          height,
        });
        this.setState({
          uploadStatus: UploadStatus.Uploading,
        });
      });
    }
  }

  private onChooseFile = (event: ChangeEvent<any>) => {
    const files = event.target.files;
    if (files.length) {
      const reader = new FileReader();
      const file: File = files[0];
      reader.addEventListener('load', () => {
        const state = {
          previewImage: reader.result,
          filename: file.name,
        };
        this.setState(state);
      });
      reader.readAsDataURL(file);
    } else {
      this.setState({
        previewImage: undefined,
      });
    }
  }

  private renderPreview() {
    const { name, previewImage, uploadStatus } = this.state;
    const { errorMessage, onUploadCancelled } = this.props;

    let emojiComponent;

    if (previewImage) {
      const emoji: EmojiDescription = {
        shortName: `:${name}:`,
        type: customCategory,
        category: customCategory,
        representation: {
          imagePath: previewImage,
          width: 24,
          height: 24,
        }
      };

      emojiComponent = (<Emoji emoji={emoji} />);
    }

    const uploading = uploadStatus === UploadStatus.Uploading;
    const spinner = uploading ? (<Spinner size="medium"/>) : undefined;

    const error = !errorMessage ? undefined : (
      <span className={styles.uploadError}><ErrorIcon label="Error" />  {errorMessage}</span>
    );

    return (
      <div className={styles.emojiUpload}>
        <div className={styles.uploadPreview}>
          Your new emoji {emojiComponent} looks great!
        </div>
        <div className={styles.uploadAddRow}>
          <AkButton onClick={this.onAddEmoji} appearance="primary" isDisabled={uploading}>Add emoji</AkButton>
          <AkButton onClick={onUploadCancelled} appearance="link" isDisabled={uploading}>Cancel</AkButton>
          {spinner}
          {error}
        </div>
      </div>
    );
  }

  private renderChooseFile() {
    const { name } = this.state;
    const disableChooser = !name;

    return (
      <div className={styles.emojiUpload}>
        <div className={styles.uploadChooseFileMessage}>For best results use square images of at least 120px</div>
        <div className={styles.uploadChooseFileRow}>
          <span className={styles.uploadChooseFileEmojiName} >
            <AkFieldBase
              appearance="standard"
              isCompact={true}
              isLabelHidden={true}
              isFocused={true}
              isFitContainerWidthEnabled={true}
            >
              <input
                placeholder="Emoji name"
                maxLength={maxNameLength}
                onChange={this.onNameChange}
                value={name}
                ref="name"
                autoFocus={true}
                type="text"
              />
            </AkFieldBase>
          </span>
          <span className={styles.uploadChooseFileBrowse} >
            <FileChooser label="Choose file" onChange={this.onChooseFile} accept="image/*" isDisabled={disableChooser} />
          </span>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.previewImage || this.state.uploadStatus === UploadStatus.Error) {
      return this.renderPreview();
    }

    return this.renderChooseFile();
  }
}
