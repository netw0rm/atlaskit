/**
 * @jest-environment node
 */
import 'jest-styled-components';
import * as React from 'react';
import { shallow } from 'enzyme';
import { Thumbnail } from '../../../src/links/cardGenericView/styled';

describe('LinkCardGenericView styles', () => {
  it('Thumbnail should extend MediaImage and use default crop', () => {
    const card = shallow(<Thumbnail dataURI="" appearance="auto" />);

    expect(card).toMatchSnapshot();
  });
});
