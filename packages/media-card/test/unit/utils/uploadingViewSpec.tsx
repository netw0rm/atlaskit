import * as React from 'react';
import {shallow} from 'enzyme';

import {UploadingView} from '../../../src/utils/uploadingView';
import {ActionsWrapper} from '../../../src/utils/uploadingView/styled';
import {MediaImage} from '../../../src/utils';

const noop = () => {/* do nothing */};

describe('UploadingView', () => {

  it('should not render actions when no actions are provided', () => {
    const card = shallow(<UploadingView progress={0} actions={[]}/>);
    expect(card.find(ActionsWrapper).exists()).toBeFalsy();
  });

  it('should render actions when actions are provided', () => {
    const card = shallow(<UploadingView progress={0} actions={[{type: 'delete', content: 'Delete', handler: noop}]}/>);
    expect(card.find(ActionsWrapper)).toBeTruthy();
  });

  it('should not render the image when dataURI is not provided', () => {
    const card = shallow(<UploadingView progress={0}/>);
    expect(card.find(MediaImage).exists()).toBeFalsy();
  });

  it('should render the image when dataURI is provided', () => {
    const card = shallow(<UploadingView progress={0} dataURI="data:png"/>);
    expect(card.find(MediaImage).exists()).toBeTruthy();
  });
});
