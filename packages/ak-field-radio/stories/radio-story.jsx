import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Button from 'ak-button';

import { AkRadio } from '../src';
import { name } from '../package.json';

const formTestUrl = 'http://www.w3schools.com/html/action_page.php';

function radioStory(content) {
  return (
    <div>
      <form
        action={formTestUrl}
        method="get"
        style={{
          backgroundColor: 'white',
          padding: '40px',
          width: '500px',
        }}
        target="myFrame"
      >
        {content}
        <p>
          <Button type="submit" appearance="primary">Submit</Button>
        </p>
      </form>

      <p>The data submitted by the form will appear below:</p>
      <iframe src="" name="myFrame" style={{ width: '50%', height: '300px' }} />
    </div>
  );
}

storiesOf(name, module)
  .add('Radio items', () => radioStory([
    <AkRadio name="item" value="children-content">Children are rendered as content</AkRadio>,
    <AkRadio name="item" value="markup-content"><b>Markup</b> in the <a href="/link">content</a></AkRadio>,
  ]));
