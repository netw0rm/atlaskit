import * as React from 'react';
import {Component} from 'react';
import FieldRadioGroup from '@atlaskit/field-radio-group';
import {
  imageFileDetails,
  gifDataUri
} from '@atlaskit/media-test-helpers';
import {CardView} from '../../src/cardView';
import {CardAppearance, CardStatus, CardDimensions} from '../../src';
import {EditableCardOptions, EditableCardContent, SliderWrapper} from './styled';
import {Slider} from '@atlaskit/media-avatar-picker';


export const generateStoriesForEditableCards = () => {
  interface EditableCardProps {

  }

  interface EditableCardState {
    appearance: CardAppearance;
    status: CardStatus;
    dimensions: CardDimensions;
  }

  class EditableCard extends Component<EditableCardProps, EditableCardState> {
    debounced: any;

    constructor(props) {
      super(props);

      this.state = {
        appearance: 'auto',
        status: 'complete',
        dimensions: {
          width: 156,
          height: 104
        }
      };
    }

    render() {
      const {appearance, status, dimensions} = this.state;
      const items = [
        { value: 'auto', label: 'Auto', defaultSelected: true },
        { value: 'small', label: 'Small', },
        { value: 'image', label: 'Image' },
        { value: 'square', label: 'Square' },
        { value: 'horizontal', label: 'Horizontal' },
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
                <Slider value={width} min={50} max={800} onChange={this.onWidthChange} />
              </div>
              <div>
                Height
                <Slider value={height} min={50} max={800} onChange={this.onHeightChange} />
              </div>
            </SliderWrapper>
            <FieldRadioGroup
              label="Appearance"
              items={items}
              onRadioChange={this.onRadioChange}
            />
          </EditableCardOptions>
          <EditableCardContent>
            <div>
              {width}x{height}
            </div>
            <CardView
              appearance={appearance}
              status={status}
              metadata={imageFileDetails}
              dataURI={gifDataUri}
              dimensions={dimensions}
            />
          </EditableCardContent>
        </div>
      );
    }

    onRadioChange = (e) => {
      const appearance = e.target.value;
      this.setState({appearance});
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
