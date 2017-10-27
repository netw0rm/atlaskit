import React from 'react';
import { storiesOf } from '@kadira/storybook';
import AtlassianLogo, {
    JiraLogo,
    JiraCoreLogo,
    JiraSoftwareLogo,
    JiraServiceDeskLogo,
    BitbucketLogo,
    ConfluenceLogo,
    HipchatLogo,
    StatuspageLogo,
    StrideLogo,
  } from '@atlaskit/logo';
import { name } from '../package.json';

storiesOf(name, module)
  .add('Logo variations', () => (
    <div style={{ padding: 20, background: 'white' }}>
      <table>
        <thead>
          <tr>
            <th>Default</th>
            <th>collapseTo=icon</th>
            <th>collapseTo=type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><AtlassianLogo /></td>
            <td><AtlassianLogo collapseTo="icon" /></td>
            <td><AtlassianLogo collapseTo="type" /></td>
          </tr>
          <tr>
            <td><JiraLogo /></td>
            <td><JiraLogo collapseTo="icon" /></td>
            <td><JiraLogo collapseTo="type" /></td>
          </tr>
          <tr>
            <td><JiraCoreLogo /></td>
            <td><JiraCoreLogo collapseTo="icon" /></td>
            <td><JiraCoreLogo collapseTo="type" /></td>
          </tr>
          <tr>
            <td><JiraSoftwareLogo /></td>
            <td><JiraSoftwareLogo collapseTo="icon" /></td>
            <td><JiraSoftwareLogo collapseTo="type" /></td>
          </tr>
          <tr>
            <td><JiraServiceDeskLogo /></td>
            <td><JiraServiceDeskLogo collapseTo="icon" /></td>
            <td><JiraServiceDeskLogo collapseTo="type" /></td>
          </tr>
          <tr>
            <td><BitbucketLogo /></td>
            <td><BitbucketLogo collapseTo="icon" /></td>
            <td><BitbucketLogo collapseTo="type" /></td>
          </tr>
          <tr>
            <td><ConfluenceLogo /></td>
            <td><ConfluenceLogo collapseTo="icon" /></td>
            <td><ConfluenceLogo collapseTo="type" /></td>
          </tr>
          <tr>
            <td><HipchatLogo /></td>
            <td><HipchatLogo collapseTo="icon" /></td>
            <td><HipchatLogo collapseTo="type" /></td>
          </tr>
          <tr>
            <td><StatuspageLogo /></td>
            <td><StatuspageLogo collapseTo="icon" /></td>
            <td><StatuspageLogo collapseTo="type" /></td>
          </tr>
          <tr>
            <td><StrideLogo /></td>
            <td><StrideLogo collapseTo="icon" /></td>
            <td><StrideLogo collapseTo="type" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  ));
