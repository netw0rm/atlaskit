import { storiesOf } from '@kadira/storybook';
import React from 'react';

import Tabs, { Tab } from '../src';
import { name } from '../package.json';

storiesOf(name, module)
  .add('Tabs', () => (
    <Tabs
      tabs={[
        <Tab
          label="Details"
          selected
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque id dapibus lectus.
            Nam eu neque massa. Etiam faucibus a ligula non ullamcorper. Vestibulum ante ipsum
            primis in faucibus orci luctus et ultrices posuere cubilia Curae; In in feugiat libero.
            Proin et tortor lectus. Proin placerat augue sit amet justo dapibus facilisis. Interdum
            et malesuada fames ac ante ipsum primis in faucibus.
          </p>
        </Tab>,
        <Tab
          label="Diff"
        >
          <p>
            Fusce molestie interdum consequat. Pellentesque porttitor mi at nulla aliquam, fringilla
            auctor urna molestie. Aenean molestie vel ipsum et scelerisque. Proin consectetur nisl
            nibh, at semper magna vestibulum volutpat. Morbi a diam lacus. Nullam nec magna id velit
            ultrices condimentum vel commodo turpis. Cras lacinia purus dolor, eget vestibulum quam
            fringilla sed. Nam tristique ex sit amet scelerisque laoreet. Duis ut auctor ante.
            Aenean quis augue ac justo mollis ultrices. Vivamus ut nisl sem. Phasellus cursus est
            sed velit fermentum, vitae pellentesque turpis gravida. Nunc venenatis porttitor nisi
            vel blandit. Sed ut feugiat metus, sit amet fermentum ex.
          </p>
        </Tab>,
        <Tab
          label="Commits"
        >
          <p>
            Vestibulum sollicitudin enim ac orci tempus, quis convallis augue eleifend. Aenean
            consectetur aliquam elit, ut ultrices eros convallis et. Aliquam at lacus egestas neque
            eleifend ultrices. Praesent et nisi lacinia, efficitur mi non, facilisis urna. Phasellus
            varius blandit felis vel dictum. Aenean posuere arcu in ligula feugiat pretium.
            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
            egestas. Vestibulum vitae tincidunt sapien. Praesent convallis elementum diam. Mauris ac
            urna sit amet risus auctor facilisis. Phasellus ex turpis, bibendum in varius eu,
            convallis non velit.
          </p>
        </Tab>,
        <Tab
          label="Pipeline"
        >
          <p>
            Donec sed nulla nec mauris laoreet facilisis eget non quam. Aenean hendrerit rutrum leo,
            tempus sagittis velit. Integer placerat ultrices orci nec tempor. Nulla venenatis
            gravida viverra. Donec id quam in eros viverra pellentesque. Sed convallis lacus id
            risus accumsan ultrices. Suspendisse nec mauris et mauris commodo varius. Praesent metus
            est, pretium sit amet ipsum ac, mollis interdum turpis. In tristique dignissim leo in
            dignissim. Pellentesque est nulla, aliquam non nunc at, tincidunt euismod magna. Nulla
            ultricies varius placerat. Vestibulum id placerat massa, in congue dolor. Etiam commodo
            nibh at vehicula tempus. Suspendisse feugiat dolor at mauris mollis rhoncus. Quisque
            eget lacinia felis. Fusce finibus libero sed nulla venenatis, non laoreet tortor
            sagittis.
          </p>
        </Tab>,
      ]}
    />
  ))
  .add('Tab', () => (
    <Tab
      label="my label"
      selected
      onSelect={() => { console.log('was selected'); }}
    >
      Content is here
    </Tab>
  ));
