import * as React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {MediaImage} from '../../src/utils/mediaImage';
import {UploadingView} from '../../src/utils/uploadingView';
import {IconLink} from '../../src/utils/uploadingView/styled';

const noop = () => {/* do nothing */};

describe('UploadingView', () => {

  it('should not render the cancel action when onCancel is not provided', () => {
    const card = shallow(<UploadingView progress={0}/>);
    expect(card.find(IconLink)).to.have.length(0);
  });

  it('should render the cancel action when onCancel is provided', () => {
    const card = shallow(<UploadingView progress={0} onCancel={noop}/>);
    expect(card.find(IconLink)).to.have.length(1);
  });

  it('should not render the image when dataURI is not provided', () => {
    const card = shallow(<UploadingView progress={0}/>);
    expect(card.find(MediaImage)).to.have.length(0);
  });

  it('should render the image when dataURI is provided', () => {
    const card = shallow(<UploadingView progress={0} dataURI="data:png"/>);
    expect(card.find(MediaImage)).to.have.length(1);
  });

});
