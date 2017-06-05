import React, { PureComponent } from 'react';
import InlineDialog from '@atlaskit/inline-dialog';
import Button from '@atlaskit/button';
import { AkNavigationItem } from '../../src/index';
import HtmlPage from './HtmlPage';
import BasicNavigation from './BasicNavigation';

export default class StickyInlineDialogExample extends PureComponent {
  state = {
    isDialogOpen: false,
  }

  toggleDialogOpen = () => {
    this.setState({ isDialogOpen: !this.state.isDialogOpen });
  }
  render() {
    return (
      <HtmlPage>
        <BasicNavigation
          containerHeaderComponent={() => (
            <InlineDialog
              content={
                <div style={{ width: 200 }}>
                  Inline dialog content
                </div>
              }
              isOpen={this.state.isDialogOpen}
              position="bottom left"
            >
              <Button appearance="subtle" onClick={this.toggleDialogOpen}>
                Header (click to toggle)
              </Button>
            </InlineDialog>
          )}
        >
          {
            Array(50).fill(true).map(() => (
              <AkNavigationItem text="Item" />
            ))
          }
        </BasicNavigation>
      </HtmlPage>
    );
  }
}
