import * as React from 'react';
import {Component} from 'react';
import { action } from '@kadira/storybook';
import FieldRadioGroup from '@atlaskit/field-radio-group';
import {
  videoFileDetails,
  imageFileDetails,
  audioFileDetails,
  docFileDetails,
  unknownFileDetails,
  genericLinkDetails,
  gifDataUri,
  smallImage,
  smallTransparentImage,
  tallImage,
  wideImage,
  wideTransparentImage
} from '@atlaskit/media-test-helpers';
import {ImageResizeMode, MediaItemType} from '@atlaskit/media-core';
import Toggle from '@atlaskit/toggle';
import Slider from '@atlaskit/field-range';
import {CardView} from '../../src/root/cardView';
import {CardAppearance, CardStatus, CardDimensions} from '../../src';
import {openAction, closeAction, deleteAction, actions} from './chapters/utils';
import {EditableCardOptions, EditableCardContent, SliderWrapper, OptionsWrapper, CardDimensionsWrapper} from './styled';
import {defaultImageCardDimensions} from '../../src/utils/cardDimensions';

const appearanceOptions = [
  { value: 'auto', label: 'Auto' },
  { value: 'small', label: 'Small', },
  { value: 'image', label: 'Image' },
  { value: 'square', label: 'Square' },
  { value: 'horizontal', label: 'Horizontal' }
];
const metadataOptions = [
  { value: 'fileImage', label: 'File image' },
  { value: 'fileVideo', label: 'File video' },
  { value: 'fileAudio', label: 'File audio' },
  { value: 'fileDoc', label: 'File doc' },
  { value: 'fileUnknown', label: 'File unknown' },
  { value: 'genericLink', label: 'Link generic' }
];
const mediaItemTypeOptions = [
  { value: 'file', label: 'File' },
  { value: 'link', label: 'Link' },
];
const dataURIOptions = [
  { value: gifDataUri, label: 'Gif' },
  { value: smallImage, label: 'Small', },
  { value: smallTransparentImage, label: 'Small transparent', },
  { value: tallImage, label: 'Tall', },
  { value: wideImage, label: 'Wide', },
  { value: wideTransparentImage, label: 'Wide transparent', },
  { value: undefined, label: 'No Image', }
];
const statusOptions = [
  {value: 'complete', label: 'complete'},
  {value: 'uploading', label: 'uploading'},
  {value: 'loading', label: 'loading'},
  {value: 'processing', label: 'processing'},
  {value: 'error', label: 'error'}
];
const resizeModeOptions = [
  {value: 'crop', label: 'crop'},
  {value: 'fit', label: 'fit'},
  {value: 'full-fit', label: 'full-fit'}
];

export const generateStoriesForEditableCards = () => {
  const localStorageKeyName = 'editableCardState';
  const metadataOptionsMap = {
    fileImage: imageFileDetails,
    fileVideo: videoFileDetails,
    fileAudio: audioFileDetails,
    fileDoc: docFileDetails,
    fileUnknown: unknownFileDetails,
    genericLink: genericLinkDetails
  };
  const getStateFromLocalStorage = () :EditableCardState | null => {
    const previousState = localStorage.getItem(localStorageKeyName);

    try {
      return JSON.parse(previousState || '');
    } catch (e) {
      return null;
    }
  };

  const getOptionsWithDefaultValue = (options: Array<{value?: string}>, value: string) => {
    const optionsWithDefault = options.map(option => ({
      ...option,
      defaultSelected: option.value === value
    }));

    return optionsWithDefault;
  };

  interface EditableCardProps {

  }

  interface EditableCardState {
    appearance: CardAppearance;
    status: CardStatus;
    dimensions: CardDimensions;
    metadata: string;
    dataURI: string;
    progress: number;
    menuActions: any;
    selectable: boolean;
    selected: boolean;
    resizeMode: ImageResizeMode;
    mediaItemType: MediaItemType;
    isMouseEnterHandlerActive: boolean;
    isClickHandlerActive: boolean;
  }

  class EditableCard extends Component<EditableCardProps, EditableCardState> {
    debounced: any;

    constructor(props) {
      super(props);
      const defaultState: EditableCardState = {
        appearance: 'auto',
        status: 'complete',
        metadata: 'fileImage',
        dataURI: gifDataUri,
        dimensions: {
          width: defaultImageCardDimensions.width,
          height: defaultImageCardDimensions.height
        },
        progress: 0,
        menuActions: actions,
        selectable: false,
        selected: false,
        resizeMode: 'crop',
        mediaItemType: 'file',
        isMouseEnterHandlerActive: true,
        isClickHandlerActive: true
      };
      const previousState = getStateFromLocalStorage();

      this.state = previousState || defaultState;
    }

    componentDidUpdate() {
      localStorage.setItem(localStorageKeyName, JSON.stringify(this.state));
    }

    render() {
      const {appearance, status, dataURI, dimensions, metadata: metadataKey, menuActions, progress, selectable, selected, resizeMode, mediaItemType} = this.state;
      const width = parseInt(`${dimensions.width}`, 0);
      const height = parseInt(`${dimensions.height}`, 0);
      const metadata = metadataOptionsMap[metadataKey];

      return (
        <div>
          <EditableCardOptions>
            <h3>Edit me</h3>
            <SliderWrapper>
              <div>
                Width ({width})
                <Slider value={width} min={144} max={1000} onChange={this.onWidthChange} />
              </div>
              <div>
                Height ({height})
                <Slider value={height} min={50} max={1000} onChange={this.onHeightChange} />
              </div>
              <div>
                Progress ({progress})
                <Slider value={progress} min={0} max={1} onChange={this.onProgressChange} />
              </div>
              <div>
                Actions <hr/>
                <div>
                  <input type="checkbox" onChange={this.onActionsChange(openAction)} checked={this.isActionChecked(openAction)}/> Open
                </div>
                <div>
                  <input type="checkbox" onChange={this.onActionsChange(closeAction)} checked={this.isActionChecked(closeAction)}/> Close
                </div>
                <div>
                  <input type="checkbox" onChange={this.onActionsChange(deleteAction)} checked={this.isActionChecked(deleteAction)}/> Delete
                </div>
              </div>
              <div>
                Selectable
                <Toggle
                  isDefaultChecked={false}
                  onChange={this.onSelectableChange}
                />
                <hr />
                Selected
                <Toggle
                  isDefaultChecked={false}
                  onChange={this.onSelectedChange}
                />
              </div>
              <div>
                On click
                <Toggle
                  isDefaultChecked={true}
                  onChange={this.onClickChange}
                />
                <hr />
                On mouse enter
                <Toggle
                  isDefaultChecked={true}
                  onChange={this.onMouseEnterChange}
                />
              </div>
            </SliderWrapper>
            <OptionsWrapper>
              <FieldRadioGroup
                label="Appearance"
                items={getOptionsWithDefaultValue(appearanceOptions, appearance)}
                onRadioChange={this.onAppearanceChange}
              />
              <FieldRadioGroup
                label="Metadata"
                items={getOptionsWithDefaultValue(metadataOptions, metadataKey)}
                onRadioChange={this.onMetadataChange}
              />
              <FieldRadioGroup
                label="MediaItemType"
                items={getOptionsWithDefaultValue(mediaItemTypeOptions, mediaItemType)}
                onRadioChange={this.onMediaItemTypeChange}
              />
              <FieldRadioGroup
                label="URI"
                items={getOptionsWithDefaultValue(dataURIOptions, dataURI)}
                onRadioChange={this.onDataURIChange}
              />
              <FieldRadioGroup
                label="Status"
                items={getOptionsWithDefaultValue(statusOptions, status)}
                onRadioChange={this.onStatusChange}
              />
              <FieldRadioGroup
                label="Resize mode"
                items={getOptionsWithDefaultValue(resizeModeOptions, resizeMode)}
                onRadioChange={this.onResizeModeChange}
              />
            </OptionsWrapper>
          </EditableCardOptions>
          <EditableCardContent>
            <CardDimensionsWrapper>
              {width}x{height}
            </CardDimensionsWrapper>
            <CardView
              appearance={appearance}
              status={status}
              metadata={metadata}
              mediaItemType={mediaItemType}
              dataURI={dataURI}
              dimensions={dimensions}
              actions={menuActions}
              progress={progress}
              selectable={selectable}
              selected={selected}
              resizeMode={resizeMode}
              onClick={this.onClick}
              onMouseEnter={this.onMouseEnter}
            />
          </EditableCardContent>
        </div>
      );
    }

    onMouseEnterChange = () => {
      this.setState({isMouseEnterHandlerActive: !this.state.isMouseEnterHandlerActive});
    }

    onClickChange = () => {
      this.setState({isClickHandlerActive: !this.state.isClickHandlerActive});
    }

    onClick = () => {
      if (this.state.isClickHandlerActive) {
        action('onClick')();
      }
    }

    onMouseEnter = () => {
      if (this.state.isMouseEnterHandlerActive) {
        action('onMouseEnter')();
      }
    }

    onSelectedChange = (e) => {
      this.setState({selected: !this.state.selected});
    }

    onSelectableChange = (e) => {
      this.setState({selectable: !this.state.selectable});
    }

    isActionChecked = action => this.state.menuActions.includes(action);

    onActionsChange = (action) => (e) => {
      const {checked} = e.target;
      const {menuActions} = this.state;

      if (checked) {
        menuActions.push(action);
      } else {
        menuActions.splice(menuActions.indexOf(action), 1);
      }

      this.setState({menuActions});
    }

    onAppearanceChange = (e) => {
      const appearance = e.target.value;
      this.setState({appearance});
    }

    onMediaItemTypeChange = (e) => {
      const mediaItemType = e.target.value;
      this.setState({mediaItemType});
    }

    onMetadataChange = (e) => {
      const metadata = e.target.value;

      this.setState({metadata});
    }

    onDataURIChange = (e) => {
      const dataURI = e.target.value;

      this.setState({dataURI});
    }

    onStatusChange = (e) => {
      const status = e.target.value;

      this.setState({status});
    }

    onResizeModeChange = (e) => {
      const resizeMode = e.target.value;

      this.setState({resizeMode});
    }

    onWidthChange = (e) => {
      const dimensions = this.state.dimensions;

      dimensions.width = e;
      this.setState({dimensions});
    }

    onHeightChange = (e) => {
      const dimensions = this.state.dimensions;

      dimensions.height = e;
      this.setState({dimensions});
    }

    onProgressChange = (progress) => {
      this.setState({progress});
    }
  }

  return <EditableCard />;
};
