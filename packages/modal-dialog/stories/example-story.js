import React from 'react';
import Lorem from 'react-lorem-component';
import { storiesOf } from '@kadira/storybook';
import Button from '@atlaskit/button';
import Layer from '@atlaskit/layer';
import Navigation from '@atlaskit/navigation';
import DropdownMenu, { DropdownItemGroupRadio, DropdownItemRadio } from '@atlaskit/dropdown-menu';
import InlineDialog from '@atlaskit/inline-dialog';
import Page from '@atlaskit/page';

import { name } from '../package.json';
import { ModalFooter } from '../src';

import AppearanceDemo from './AppearanceDemo';
import AutofocusDemo from './AutofocusDemo';
import HeadFootDemo from './HeadFootDemo';
import HeightDemo from './HeightDemo';
import ModalDemo from './ModalDemo';
import MultipleDemo from './MultipleDemo';
import ShowHideDemo from './ShowHideDemo';
import SubmitDemo from './SubmitDemo';
import WidthDemo from './WidthDemo';

const onClick = ({ target }) => console.log(target.innerText);
const actions = [
  { text: 'Primary', onClick },
  { text: 'Secondary', onClick },
  { text: 'Tertiary', onClick },
];

storiesOf(name, module)
  .add('animated entry/exit', () => <ShowHideDemo />)
  .add('alternative appearances', () => <AppearanceDemo />)
  .add('autofocus behaviour', () => <AutofocusDemo />)
  .add('multiple modals', () => <MultipleDemo />)
  .add('form submission', () => <SubmitDemo />)
  .add('actions', () => <ModalDemo heading="Multiple Actions" actions={actions} />)
  .add('height', () => <HeightDemo />)
  .add('width', () => <WidthDemo />)
  .add('header and footer', () => <HeadFootDemo />)
  .add('z-index test', () => (
    <div>
      <Page navigation={<Navigation>{}</Navigation>}>
        <Layer content={<span>I am the popup content</span>} position="right middle">
          <span style={{ border: '1px solid yellow' }}>
            There should be a layer of text to the right of this:
          </span>
        </Layer>
      </Page>
      <ModalDemo
        heading="Z-Index Text"
        footer={() => (
          <ModalFooter>
            <span />
            <InlineDialog
              content="Some content to indicate layout behaviour."
              isOpen
              position="top right"
            >
              <Button>Dialog Anchor (top right)</Button>
            </InlineDialog>
          </ModalFooter>
        )}
      >
        <div>
          <Lorem count="2" style={{ marginBottom: 16 }} />
          <DropdownMenu trigger="Choose city" triggerType="button">
            <DropdownItemGroupRadio id="cities" heading="Cities">
              <DropdownItemRadio id="sydney">Sydney</DropdownItemRadio>
              <DropdownItemRadio id="canberra">Canberra</DropdownItemRadio>
              <DropdownItemRadio id="melbourne">Melbourne</DropdownItemRadio>
              <DropdownItemRadio id="perth">Perth</DropdownItemRadio>
            </DropdownItemGroupRadio>
          </DropdownMenu>
        </div>
      </ModalDemo>
    </div>
  ))
  .add('chromeless', () => (
    <ModalDemo isChromeless width="20em">
      <div style={{ color: 'white' }}>
        <h4>Look ma, no chrome!</h4>
        <p>Ecosystem vendors use this option with some of their
          apps so they can provide their own dialog style.</p>
      </div>
    </ModalDemo>
  ));
