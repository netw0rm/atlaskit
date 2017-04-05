/* tslint:disable:variable-name */
import { storiesOf, action } from '@kadira/storybook';
import * as React from 'react';
import styled from 'styled-components';
import {Slider} from '../../src/slider/slider';

const Container = styled.div`
    width: 500px
`;

storiesOf('Slider', {})
    .add('default', () => (
        <Container>
            <Slider onChange={action('onChange')} />
        </Container>
    ));
