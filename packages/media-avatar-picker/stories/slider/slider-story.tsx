/* tslint:disable:variable-name */
import { storiesOf, action } from '@kadira/storybook';
import * as React from 'react';
import styled from 'styled-components';
import {Slider} from '../../src';

const Container = styled.div`
    width: 500px
`;

storiesOf('Slider', {})
    .add('default', () => (
        <Container>
            <Slider value={20} min={0} max={100} onChange={action('onChange')} />
        </Container>
    ));
