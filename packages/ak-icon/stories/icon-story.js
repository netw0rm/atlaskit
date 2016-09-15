import { storiesOf } from '@kadira/storybook';
import { vdom } from 'skatejs';
import AnimationDemo from './AnimationDemo';
const { React, ReactDOM } = window;
import reactify from 'akutil-react';
import { name } from '../package.json';


const req = require.context('../glyph', true, /^.*\.js/);
const reactifiedComponents = req.keys().reduce((prev, file) => {
  const Icon = req(file).default;
  const ReactIcon = reactify(Icon, { React, ReactDOM });
  prev[file] = ReactIcon;
  return prev;
}, {});

storiesOf('ak-icon', module)
  .add('All icons', () => (
    <table>
      <tr>
        <th>Icon</th><th>Import</th><th>Web component</th>
      </tr>
      {Object.keys(reactifiedComponents).map((file) => {
        const Icon = reactifiedComponents[file];
        const fileBase = file.substring(2, file.length - 3);
        const importName = `${name}/glyph/${fileBase}`;
        const tagName = `${name}-${fileBase.split('/').join('-')}`;
        return (
          <tr key={file}>
            <td><Icon /></td>
            <td><pre>import '{importName}';</pre></td>
            <td><pre>&lt;{tagName}/&gt;</pre></td>
          </tr>
        );
      })}
    </table>
  ))
  .add('Animated', () => <AnimationDemo components={reactifiedComponents} />);
