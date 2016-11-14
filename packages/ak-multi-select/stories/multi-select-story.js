import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import React from 'react';

import WebComponent, { Item as MultiItem, Group as MultiGroup } from '../src';
import { name } from '../package.json';

const MultiSelect = reactify(WebComponent);
const Item = reactify(MultiItem);
const Group = reactify(MultiGroup);

storiesOf(name, module)
  .add('a simple ak-multi-select', () => (
    <div style={{ width: '500px', border: '3px solid #ddd', borderRadius: '3px' }}>
      <MultiSelect placeholder="Select your favourite cities" label="Australia">
        <Group heading="NSW">
          <Item value="au1">Sydney (State capital)</Item>
          <Item value="au2">Albury</Item>
          <Item value="au3">Armidale</Item>
          <Item value="au4">Bathurst</Item>
          <Item value="au5">Blue Mountains</Item>
          <Item value="au6">Broken Hill</Item>
          <Item value="au7">Campbelltown</Item>
          <Item value="au8">Cessnock</Item>
          <Item value="au9">Dubbo</Item>
          <Item value="au10">Goulburn</Item>
          <Item value="au11">Grafton</Item>
          <Item value="au12">Lithgow</Item>
          <Item value="au13">Liverpool</Item>
          <Item value="au14">Newcastle</Item>
          <Item value="au15">Orange</Item>
          <Item value="au16">Parramatta</Item>
          <Item value="au17">Penrith</Item>
        </Group>
        <Group heading="Victoria">
          <Item value="au18">Melbourne (State capital)</Item>
          <Item value="au19">Ararat</Item>
          <Item value="au20">Bairnsdale</Item>
          <Item value="au21">Benalla</Item>
          <Item value="au22">Ballarat</Item>
          <Item value="au23">Bendigo</Item>
          <Item value="au24">Dandenong</Item>
          <Item value="au25">Frankston</Item>
          <Item value="au26">Geelong</Item>
          <Item value="au27">Hamilton</Item>
          <Item value="au28">Horsham</Item>
          <Item value="au29">Latrobe City</Item>
          <Item value="au30">Melton</Item>
          <Item value="au31">Mildura</Item>
          <Item value="au32">Sale</Item>
          <Item value="au33">Shepparton</Item>
          <Item value="au34">Swan Hill</Item>
          <Item value="au35">Wangaratta</Item>
          <Item value="au36">Warrnambool</Item>
          <Item value="au37">Wodonga</Item>
        </Group>
        <Group heading="Queensland">
          <Item value="au38">Brisbane (State capital)</Item>
          <Item value="au39">Bundaberg</Item>
          <Item value="au40">Caboolture</Item>
          <Item value="au41">Cairns</Item>
          <Item value="au42">Caloundra</Item>
          <Item value="au43">Gladstone</Item>
          <Item value="au44">Gold Coast</Item>
          <Item value="au45">Gympie</Item>
          <Item value="au46">Hervey Bay</Item>
          <Item value="au47">Ipswich</Item>
          <Item value="au48">Logan City</Item>
          <Item value="au49">Mackay</Item>
          <Item value="au50">Maryborough</Item>
          <Item value="au51">Mount Isa</Item>
          <Item value="au52">Rockhampton</Item>
          <Item value="au53">Sunshine Coast</Item>
          <Item value="au54">Toowoomba</Item>
          <Item value="au55">Townsville</Item>
        </Group>
      </MultiSelect>
    </div>
  ));
