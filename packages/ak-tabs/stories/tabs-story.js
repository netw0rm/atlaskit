import { storiesOf, action } from '@kadira/storybook';
import React from 'react';
import reactify from 'akutil-react';

import AkTabs, { events, Tab as AkTab } from '../src';
import { name } from '../package.json';


const { tabChange: tabChangeEvent } = events;
const Component = reactify(AkTabs);

function changeHandler(e) {
  action(`The "${e.target.label}" tab was changed. selected: ${e.target.selected}`)();
}

storiesOf(name, module)
  .add('simple ak-tabs', () => (
    <Component>
      <ak-tabs-tab selected label="Details">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque id dapibus lectus.
          Nam eu neque massa. Etiam faucibus a ligula non ullamcorper. Vestibulum ante ipsum primis
          in faucibus orci luctus et ultrices posuere cubilia Curae; In in feugiat libero. Proin et
          tortor lectus. Proin placerat augue sit amet justo dapibus facilisis. Interdum et
          malesuada fames ac ante ipsum primis in faucibus.
        </p>
      </ak-tabs-tab>
      <ak-tabs-tab label="Diff">
        <p>
          Fusce molestie interdum consequat. Pellentesque porttitor mi at nulla aliquam, fringilla
          auctor urna molestie. Aenean molestie vel ipsum et scelerisque. Proin consectetur nisl
          nibh, at semper magna vestibulum volutpat. Morbi a diam lacus. Nullam nec magna id velit
          ultrices condimentum vel commodo turpis. Cras lacinia purus dolor, eget vestibulum quam
          fringilla sed. Nam tristique ex sit amet scelerisque laoreet. Duis ut auctor ante. Aenean
          quis augue ac justo mollis ultrices. Vivamus ut nisl sem. Phasellus cursus est sed velit
          fermentum, vitae pellentesque turpis gravida. Nunc venenatis porttitor nisi vel blandit.
          Sed ut feugiat metus, sit amet fermentum ex.
        </p>
      </ak-tabs-tab>
      <ak-tabs-tab label="Commits">
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
      </ak-tabs-tab>
      <ak-tabs-tab label="Pipeline">
        <p>
          Donec sed nulla nec mauris laoreet facilisis eget non quam. Aenean hendrerit rutrum leo,
          tempus sagittis velit. Integer placerat ultrices orci nec tempor. Nulla venenatis gravida
          viverra. Donec id quam in eros viverra pellentesque. Sed convallis lacus id risus accumsan
          ultrices. Suspendisse nec mauris et mauris commodo varius. Praesent metus est, pretium sit
          amet ipsum ac, mollis interdum turpis. In tristique dignissim leo in dignissim.
          Pellentesque est nulla, aliquam non nunc at, tincidunt euismod magna. Nulla ultricies
          varius placerat. Vestibulum id placerat massa, in congue dolor. Etiam commodo nibh at
          vehicula tempus. Suspendisse feugiat dolor at mauris mollis rhoncus. Quisque eget lacinia
          felis. Fusce finibus libero sed nulla venenatis, non laoreet tortor sagittis.
        </p>
      </ak-tabs-tab>
    </Component>
  ))
  .add('simple ak-tabs with surrounding content', () => (
    <div>
      <h1>Content before tabs</h1>
      <p>
        Etiam blandit eros nunc, ac vulputate nulla consequat luctus. Nullam lacus tellus, laoreet
        nec consequat et, malesuada id tortor. Aliquam a luctus nisi, in viverra felis. Sed sem
        velit, venenatis vel orci vel, cursus tristique lectus. Sed luctus tincidunt rutrum. Etiam
        lobortis nisl condimentum, placerat magna sit amet, porttitor justo. Aenean suscipit in
        neque nec luctus. Pellentesque fermentum accumsan pretium. Suspendisse euismod lacus in sem
        elementum congue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames
        ac turpis egestas. Phasellus ultrices, lacus vitae fermentum porttitor, odio libero
        porttitor nisl, eu tincidunt justo arcu sed tellus. Donec in dictum magna. In fermentum ex
        ut feugiat sodales.
      </p>
      <Component>
        <ak-tabs-tab selected label="Details">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque id dapibus lectus.
            Nam eu neque massa. Etiam faucibus a ligula non ullamcorper. Vestibulum ante ipsum
            primis in faucibus orci luctus et ultrices posuere cubilia Curae; In in feugiat libero.
            Proin et tortor lectus. Proin placerat augue sit amet justo dapibus facilisis. Interdum
            et malesuada fames ac ante ipsum primis in faucibus.
          </p>
        </ak-tabs-tab>
        <ak-tabs-tab label="Diff">
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
        </ak-tabs-tab>
        <ak-tabs-tab label="Commits">
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
        </ak-tabs-tab>
        <ak-tabs-tab label="Pipeline">
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
        </ak-tabs-tab>
      </Component>
      <h1>Content after tabs</h1>
      <p>
        Etiam blandit eros nunc, ac vulputate nulla consequat luctus. Nullam lacus tellus, laoreet
        nec consequat et, malesuada id tortor. Aliquam a luctus nisi, in viverra felis. Sed sem
        velit, venenatis vel orci vel, cursus tristique lectus. Sed luctus tincidunt rutrum. Etiam
        lobortis nisl condimentum, placerat magna sit amet, porttitor justo. Aenean suscipit in
        neque nec luctus. Pellentesque fermentum accumsan pretium. Suspendisse euismod lacus in sem
        elementum congue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames
        ac turpis egestas. Phasellus ultrices, lacus vitae fermentum porttitor, odio libero
        porttitor nisl, eu tincidunt justo arcu sed tellus. Donec in dictum magna. In fermentum ex
        ut feugiat sodales.
      </p>
    </div>
  ))
  .add('ak-tabs with many items', () => (
    <Component>
      <ak-tabs-tab selected label="1 Tab">Tab 1 content</ak-tabs-tab>
      <ak-tabs-tab label="2 Tab">Tab 2 content</ak-tabs-tab>
      <ak-tabs-tab label="3 Tab">Tab 3 content</ak-tabs-tab>
      <ak-tabs-tab label="4 Tab">Tab 4 content</ak-tabs-tab>
      <ak-tabs-tab label="5 Another tab">Tab content</ak-tabs-tab>
      <ak-tabs-tab label="6 Tab">Tab content</ak-tabs-tab>
      <ak-tabs-tab label="7 Tab">Tab content</ak-tabs-tab>
      <ak-tabs-tab label="8 Tab">Tab content</ak-tabs-tab>
      <ak-tabs-tab label="9 Tab">Tab content</ak-tabs-tab>
      <ak-tabs-tab label="10 Long tab name">Tab content</ak-tabs-tab>
      <ak-tabs-tab label="11 Tab">Tab content</ak-tabs-tab>
      <ak-tabs-tab label="12 Tab">Tab content</ak-tabs-tab>
      <ak-tabs-tab label="13 Tab">Tab content</ak-tabs-tab>
      <ak-tabs-tab label="14 Tab">Tab content</ak-tabs-tab>
      <ak-tabs-tab label="15 Tab">Tab content</ak-tabs-tab>
      <ak-tabs-tab label="16 Tab">Tab content</ak-tabs-tab>
      <ak-tabs-tab label="17 Tab">Tab content</ak-tabs-tab>
      <ak-tabs-tab label="18 Tab">Tab content</ak-tabs-tab>
      <ak-tabs-tab label="19 Tab">Tab content</ak-tabs-tab>
      <ak-tabs-tab label="20 Tab">Tab content</ak-tabs-tab>
    </Component>
  ))
  .add('simple ak-tabs inside a container', () => (
    <div style={{ width: '300px', border: '1px solid black' }}>
      <Component>
        <ak-tabs-tab selected label="Details">Details content</ak-tabs-tab>
        <ak-tabs-tab label="Diff">Diff content</ak-tabs-tab>
        <ak-tabs-tab label="Commits">Commits content</ak-tabs-tab>
        <ak-tabs-tab label="Pipeline">Pipeline content</ak-tabs-tab>
      </Component>
    </div>
  ))
  .add('ak-tabs inside a container with last tab selected', () => (
    <div style={{ width: '300px', border: '1px solid black' }}>
      <Component>
        <ak-tabs-tab label="Details">Details content</ak-tabs-tab>
        <ak-tabs-tab label="Diff">Diff content</ak-tabs-tab>
        <ak-tabs-tab label="Commits">Commits content</ak-tabs-tab>
        <ak-tabs-tab selected label="Pipeline">Pipeline content</ak-tabs-tab>
      </Component>
    </div>
  ))
  .add('ak-tabs with many items inside a container', () => (
    <div style={{ width: '300px', border: '1px solid black' }}>
      <Component>
        <ak-tabs-tab selected label="Tab 1">Tab 1 content</ak-tabs-tab>
        <ak-tabs-tab label="Tab 2">Tab 2 content</ak-tabs-tab>
        <ak-tabs-tab label="Tab 3">Tab 3 content</ak-tabs-tab>
        <ak-tabs-tab label="Tab 4">Tab 4 content</ak-tabs-tab>
        <ak-tabs-tab label="Another tab 5">Tab 5 content</ak-tabs-tab>
        <ak-tabs-tab label="Tab 6">Tab 6 content</ak-tabs-tab>
        <ak-tabs-tab label="Tab 7">Tab 7 content</ak-tabs-tab>
        <ak-tabs-tab label="Tab 8">Tab 8 content</ak-tabs-tab>
        <ak-tabs-tab label="Tab 9">Tab 9 content</ak-tabs-tab>
        <ak-tabs-tab label="Long tab name 10">Tab 10 content</ak-tabs-tab>
      </Component>
    </div>
  ))
  .add('ak-tabs with no children', () => (
    <Component />
  ))
  .add('ak-tabs with multiple tabs with selected attribute', () => (
    <Component>
      <ak-tabs-tab selected label="Tab 1">Tab 1 has selected attribute</ak-tabs-tab>
      <ak-tabs-tab selected label="Tab 2">Tab 2 has selected attribute</ak-tabs-tab>
      <ak-tabs-tab selected label="Tab 3">Tab 3 has selected attribute</ak-tabs-tab>
    </Component>
  ))
  .add('ak-tabs with tabbable content', () => (
    <Component>
      <ak-tabs-tab selected label="Tab 1">
        <h1>Tab 1</h1>
        <p>Some text here with a <a href="http://www.atlassian.com">link</a>.</p>
      </ak-tabs-tab>
      <ak-tabs-tab selected label="Tab 2">
        <h1>Tab 2</h1>
        <p>Some more text here with a <a href="http://www.atlassian.com">link</a>.</p>
        <p>Another <a href="http://www.atlassian.com">link</a>.</p>
      </ak-tabs-tab>
    </Component>
  ))
  .add('ak-tabs with a very long label', () => (
    <Component>
      <ak-tabs-tab
        selected
        label="This tab has a very long with lots of text in it that goes on and on and on and
        should take up all the horizontal space on the page, and be truncated to fit on the page.
        Here is some more text to ensure that this label does indeed take up all the available
        horizontal space and force the ak-tabs component to handle it."
      >
        <h1>Tab 1</h1>
        <p>Some text here with a <a href="http://www.atlassian.com">link</a>.</p>
      </ak-tabs-tab>
    </Component>
  ))
  .add('ak-tabs with multiple very long labels', () => (
    <Component>
      <ak-tabs-tab
        selected
        label="This tab has a very long with lots of text in it that goes on and on and on and
        should take up all the horizontal space on the page, and be truncated to fit on the page.
        Here is some more text to ensure that this label does indeed take up all the available
        horizontal space and force the ak-tabs component to handle it."
      >
        <h1>Tab 1</h1>
        <p>Some text here with a <a href="http://www.atlassian.com">link</a>.</p>
      </ak-tabs-tab>
      <ak-tabs-tab
        selected
        label="This second tab also is very long and has lots of text. If this tab is selected, the
        label text should be truncated with an ellipsis so that it fits onto the available space on
        the page."
      >
        <h1>Tab 2</h1>
        <p>Some text here with a <a href="http://www.atlassian.com">link</a>.</p>
      </ak-tabs-tab>
    </Component>
  ))
  .add('ak-tabs with event listeners', () => {
    // TODO bind via JSX attribute 'onTabChange={() => ...}'
    window.removeEventListener(tabChangeEvent, changeHandler);
    window.addEventListener(tabChangeEvent, changeHandler);

    return (
      <Component>
        <ak-tabs-tab selected label="Tab 1">
          <h1>Tab 1</h1>
          <p>An event listener will log output to the console when this tab is selected.</p>
        </ak-tabs-tab>
        <ak-tabs-tab label="Tab 2">
          <h1>Tab 2</h1>
          <p>An event listener will log output to the console when this tab is selected.</p>
        </ak-tabs-tab>
      </Component>
    );
  })
  .add('ak-tabs added programatically', () => {
    let i = 1;

    function addTab() {
      const newTab = new AkTab();
      newTab.label = `New tab ${i}`;
      newTab.innerHTML = `<p>New tab content ${i}</p>`;
      document.getElementById('my-tabs').appendChild(newTab);
      i++;
    }

    return (
      <div>
        <Component id="my-tabs" />
        <button onClick={addTab}>Add tab</button>
      </div>
    );
  });
