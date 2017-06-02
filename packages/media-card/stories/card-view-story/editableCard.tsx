import * as React from 'react';
import {Component} from 'react';
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
import {MediaItemDetails} from '@atlaskit/media-core';
import {CardView} from '../../src/cardView';
import {CardAppearance, CardStatus, CardDimensions} from '../../src';
import {EditableCardOptions, EditableCardContent, SliderWrapper, OptionsWrapper, CardDimensionsWrapper} from './styled';
import {Slider} from '@atlaskit/media-avatar-picker';


export const generateStoriesForEditableCards = () => {
  interface EditableCardProps {

  }

  interface EditableCardState {
    appearance: CardAppearance;
    status: CardStatus;
    dimensions: CardDimensions;
    metadata: MediaItemDetails;
    dataURI: string;
  }

  class EditableCard extends Component<EditableCardProps, EditableCardState> {
    debounced: any;

    constructor(props) {
      super(props);

      this.state = {
        appearance: 'auto',
        status: 'complete',
        metadata: imageFileDetails,
        dataURI: gifDataUri,
        dimensions: {
          width: 156,
          height: 104
        }
      };
    }

    render() {
      const {appearance, status, dataURI, dimensions, metadata} = this.state;
      const appearanceOptions = [
        { value: 'auto', label: 'Auto', defaultSelected: true },
        { value: 'small', label: 'Small', },
        { value: 'image', label: 'Image' },
        { value: 'square', label: 'Square' },
        { value: 'horizontal', label: 'Horizontal' }
      ];
      const metadataOptions = [
        { value: 'fileImage', label: 'File image', defaultSelected: true },
        { value: 'fileVideo', label: 'File video' },
        { value: 'fileAudio', label: 'File audio' },
        { value: 'fileDoc', label: 'File doc' },
        { value: 'fileUnknown', label: 'File unknown' },
        { value: 'genericLink', label: 'Link generic' }
      ];
      const dataURIOptions = [
        { value: gifDataUri, label: 'Gif', defaultSelected: true },
        { value: smallImage, label: 'Small', },
        { value: smallTransparentImage, label: 'Small transparent', },
        { value: tallImage, label: 'Tall', },
        { value: wideImage, label: 'Wide', },
        { value: wideTransparentImage, label: 'Wide transparent', },
      ];
      const statusOptions = [
        {value: 'complete', label: 'complete', defaultSelected: true},
        {value: 'uploading', label: 'uploading'},
        {value: 'loading', label: 'loading'},
        {value: 'processing', label: 'processing'},
        {value: 'error', label: 'error'}
      ];
      const width = parseInt(dimensions.width, 0);
      const height = parseInt(dimensions.height, 0);

      return (
        <div>
          <EditableCardOptions>
            <h3>Edit me</h3>
            <SliderWrapper>
              <div>
                Width
                <Slider value={width} min={144} max={800} onChange={this.onWidthChange} />
              </div>
              <div>
                Height
                <Slider value={height} min={50} max={800} onChange={this.onHeightChange} />
              </div>
            </SliderWrapper>
            <OptionsWrapper>
              <FieldRadioGroup
                label="Appearance"
                items={appearanceOptions}
                onRadioChange={this.onAppearanceChange}
              />
              <FieldRadioGroup
                label="Metadata"
                items={metadataOptions}
                onRadioChange={this.onMetadataChange}
              />
              <FieldRadioGroup
                label="URI"
                items={dataURIOptions}
                onRadioChange={this.onDataURIChange}
              />
              <FieldRadioGroup
                label="Status"
                items={statusOptions}
                onRadioChange={this.onStatusChange}
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
              dataURI={dataURI}
              dimensions={dimensions}
            />
          </EditableCardContent>
        </div>
      );
    }

    onAppearanceChange = (e) => {
      const appearance = e.target.value;
      this.setState({appearance});
    }

    onMetadataChange = (e) => {
      const label = e.target.value;

      this.setState({
        metadata: {
          fileImage: imageFileDetails,
          fileVideo: videoFileDetails,
          fileAudio: audioFileDetails,
          fileDoc: docFileDetails,
          fileUnknown: unknownFileDetails,
          genericLink: genericLinkDetails,
        }[label]
      });
    }

    onDataURIChange = (e) => {
      const dataURI = e.target.value;

      this.setState({dataURI});
    }

    onStatusChange = (e) => {
      const status = e.target.value;

      this.setState({status});
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
  }

  return <EditableCard />;
};
