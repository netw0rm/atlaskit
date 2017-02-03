import Readme, { Code, Heading } from '@atlaskit/util-readme';
import { storiesOf } from '@kadira/storybook';
import * as React from 'react';

import * as OverviewExampleRaw from '!raw!./examples/overview.tsx';
import OverviewExample from './examples/overview';

import { description, name } from '../package.json';

storiesOf(name, module)
  .add('Readme', () => (
    <div>
      <Readme
        component={name}
        description={description}
      >
        <Code code={OverviewExampleRaw}>
          {OverviewExample}
        </Code>
        <Heading type="2">Props</Heading>
        <table>
          <thead style={{ border: 0, borderBottom: '1px solid #ddd' }}>
            <tr>
              <th>Name (* is required)</th>
              <th>Type</th>
              <th>Default value</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody style={{ border: 0 }}>
            <tr>
              <td><code>context</code></td>
              <td><code>'default'</code></td>
              <td>'default'</td>
              <td>Deprecated.</td>
            </tr>
            <tr>
              <td><code>isExpandedByDefault</code></td>
              <td><code>boolean</code></td>
              <td>false</td>
              <td>If true, the editor is expanded (i.e. not collapsed).</td>
            </tr>
            <tr>
              <td><code>defaultValue</code></td>
              <td><code>string</code></td>
              <td>--</td>
              <td>A JIRA HTML value string containing the initial value. The structure of the HTML is the server-rendered shape for rendering JIRA wiki markup.</td>
            </tr>
            <tr>
              <td><code>onCancel</code></td>
              <td><code>(editor?: Editor) => void</code></td>
              <td>--</td>
              <td>A callback for when the editor's 'cancel' button is triggered.</td>
            </tr>
            <tr>
              <td><code>onChange</code></td>
              <td><code>(editor?: Editor) => void</code></td>
              <td>--</td>
              <td>A callback for when the editor's content changes.</td>
            </tr>
            <tr>
              <td><code>onSave</code></td>
              <td><code>(editor?: Editor) => void</code></td>
              <td>--</td>
              <td>A callback for when the editor's 'save' button is triggered.</td>
            </tr>
            <tr>
              <td><code>placeholder</code></td>
              <td><code>string</code></td>
              <td>--</td>
              <td>Text to display in the collapsed editor.</td>
            </tr>
            <tr>
              <td><code>analyticsHandler</code></td>
              <td><code>{`(name: string, properties?: { [key: string]: string | Number } ): any`}</code></td>
              <td><code>--</code></td>
              <td>A callback for handling an analytics event emitted from the editor.</td>
            </tr>
            <tr>
              <td><code>allowLists</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>If true, 'lists' can be used in the editor.</td>
            </tr>
          </tbody>
        </table>
      </Readme>
    </div>
  ));
