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
            <th>Customised colours</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><AtlassianLogo /></td>
            <td><AtlassianLogo collapseTo="icon" /></td>
            <td><AtlassianLogo collapseTo="type" /></td>
            <td><AtlassianLogo iconColor="#2684FF" textColor="#253858" iconGradientStart="#0052CC" iconGradientStop="#2684FF" /></td>
          </tr>
          <tr>
            <td><JiraLogo /></td>
            <td><JiraLogo collapseTo="icon" /></td>
            <td><JiraLogo collapseTo="type" /></td>
            <td><JiraLogo iconColor="#2684FF" textColor="#253858" iconGradientStart="#0052CC" iconGradientStop="#2684FF" /></td>
          </tr>
          <tr>
            <td><JiraCoreLogo /></td>
            <td><JiraCoreLogo collapseTo="icon" /></td>
            <td><JiraCoreLogo collapseTo="type" /></td>
            <td><JiraCoreLogo iconColor="#2684FF" textColor="#253858" iconGradientStart="#0052CC" iconGradientStop="#2684FF" /></td>
          </tr>
          <tr>
            <td><JiraSoftwareLogo /></td>
            <td><JiraSoftwareLogo collapseTo="icon" /></td>
            <td><JiraSoftwareLogo collapseTo="type" /></td>
            <td><JiraSoftwareLogo iconColor="#2684FF" textColor="#253858" iconGradientStart="#0052CC" iconGradientStop="#2684FF" /></td>
          </tr>
          <tr>
            <td><JiraServiceDeskLogo /></td>
            <td><JiraServiceDeskLogo collapseTo="icon" /></td>
            <td><JiraServiceDeskLogo collapseTo="type" /></td>
            <td><JiraServiceDeskLogo iconColor="#2684FF" textColor="#253858" iconGradientStart="#0052CC" iconGradientStop="#2684FF" /></td>
          </tr>
          <tr>
            <td><BitbucketLogo /></td>
            <td><BitbucketLogo collapseTo="icon" /></td>
            <td><BitbucketLogo collapseTo="type" /></td>
            <td><BitbucketLogo iconColor="#2684FF" textColor="#253858" iconGradientStart="#0052CC" iconGradientStop="#2684FF" /></td>
          </tr>
          <tr>
            <td><ConfluenceLogo /></td>
            <td><ConfluenceLogo collapseTo="icon" /></td>
            <td><ConfluenceLogo collapseTo="type" /></td>
            <td><ConfluenceLogo iconColor="#2684FF" textColor="#253858" iconGradientStart="#0052CC" iconGradientStop="#2684FF" /></td>
          </tr>
          <tr>
            <td><HipchatLogo /></td>
            <td><HipchatLogo collapseTo="icon" /></td>
            <td><HipchatLogo collapseTo="type" /></td>
            <td><HipchatLogo iconColor="#2684FF" textColor="#253858" iconGradientStart="#0052CC" iconGradientStop="#2684FF" /></td>
          </tr>
          <tr>
            <td><StatuspageLogo /></td>
            <td><StatuspageLogo collapseTo="icon" /></td>
            <td><StatuspageLogo collapseTo="type" /></td>
            <td><StatuspageLogo iconColor="#2684FF" textColor="#253858" iconGradientStart="#0052CC" iconGradientStop="#2684FF" /></td>
          </tr>
          <tr>
            <td><StrideLogo /></td>
            <td><StrideLogo collapseTo="icon" /></td>
            <td><StrideLogo collapseTo="type" /></td>
            <td><StrideLogo iconColor="#2684FF" textColor="#253858" iconGradientStart="#0052CC" iconGradientStop="#2684FF" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  ));
