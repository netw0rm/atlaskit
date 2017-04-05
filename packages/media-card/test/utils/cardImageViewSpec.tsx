import * as React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import { CardImageView } from '../../src/utils/cardImageView';
import { FileIcon } from '../../src/utils';
import { CardOverlay } from '../../src/utils/cardImageView/cardOverlay';

describe('CardImageView', () => {
  it('should render default icon according to mediaType', () => {
    const card = mount(<CardImageView mediaType="audio" />);

    expect(card.find(FileIcon).props().mediaType).to.equal('audio');
  });

  it('should render a custom icon when provided', () => {
    const iconUrl = 'path/to/icon';
    const card = mount(<CardImageView icon={iconUrl} />);

    expect(card.find('.custom-icon')).to.have.length(1);
    expect(card.find('.custom-icon').prop('src')).to.equal(iconUrl);
  });

  it('should render subtitle when provided', function() {
    const subtitle = 'Software Development and Collaboration Tools';
    const card = mount(<CardImageView subtitle={subtitle} />);

    expect(card.find(CardOverlay).props().subtitle).to.equal(subtitle);
  });
});
