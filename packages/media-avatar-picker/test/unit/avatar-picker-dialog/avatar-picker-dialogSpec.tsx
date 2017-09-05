import * as React from 'react';
import {shallow} from 'enzyme';
import ModalDialog from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';
import {Avatar} from '../../../src/avatar-list';
import {ImageNavigator} from '../../../src/image-navigator';
import {PredefinedAvatarList} from '../../../src/predefined-avatar-list';
import {AvatarPickerDialog} from '../../../src/avatar-picker-dialog';

describe('Avatar Picker Dialog', () => {
  const renderWithProps = props => shallow(
    <AvatarPickerDialog
      avatars={[]}
      onSaveAvatar={jest.fn()}
      onSaveImage={jest.fn()}
      {...props}
    />);
  it('when save button is clicked call onSaveImage should be called', () => {
    const newImage = new File(['dsjklDFljk'], 'nice-photo.png', {
      type: 'image/png',
    });
    const onSaveImage = jest.fn();

    const component = renderWithProps({ onSaveImage });
    const { onImageChanged } = component.find(ImageNavigator).props();
    onImageChanged(newImage, { x: 0, y: 0, size: 30 });

    const { footer } = component.find(ModalDialog).props();
    // click on the save button
    shallow(footer)
      .find(Button)
      .find({ appearance: 'primary' })
      .simulate('click');

    expect(onSaveImage).toBeCalledWith(
      newImage,
      { x: 0, y: 0, size: 30 });
  });
  it('when save button is clicked call onSaveAvatar should be called', () => {
    const selectedAvatar: Avatar = { dataURI: 'http://an.avatar.com/453'};
    const avatars = [selectedAvatar];
    const onSaveAvatar = jest.fn();

    const component = renderWithProps({ avatars, onSaveAvatar });
    const { onAvatarSelected } = component.find(PredefinedAvatarList).props();
    onAvatarSelected(selectedAvatar);

    const { footer } = component.find(ModalDialog).props();
    // click on the save button
    shallow(footer)
      .find(Button)
      .find({ appearance: 'primary' })
      .simulate('click');

    expect(onSaveAvatar).toBeCalledWith(selectedAvatar);
  });
});
