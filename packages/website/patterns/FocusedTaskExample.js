import React from 'react';

import Navigation, {
  AkNavigationItemGroup,
  AkNavigationItem,
  AkCreateDrawer,
} from '@atlaskit/navigation';
import Button from '@atlaskit/button';
import ModalDialog from '@atlaskit/modal-dialog';
import styled from 'styled-components';
import ProjectIcon from '@atlaskit/icon/glyph/folder';
import ArrowleftIcon from '@atlaskit/icon/glyph/arrow-left';
import JiraIcon from '@atlaskit/icon/glyph/jira';
import AddIcon from '@atlaskit/icon/glyph/add';

const drawerOptions = [
  {
    id: 'project-create',
    label: 'Create project',
    Icon: ProjectIcon,
  },
];

const FocusedTaskContentWrapper = styled.div`
    margin: 0 auto;
    max-width: 300px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const DialogContent = styled.div`
  height: 400px;
`;

class FocusedTaskExample extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isDialogOpen: false,
      isDrawerOpen: false,
      isProjectCreate: false,
    };
  }

  onItemClick = (itemId) => {
    if (itemId === 'project-create') {
      this.setState({ isProjectCreate: true });
    }
  };

  onCloseDrawer = () => {
    this.setState({
      isDrawerOpen: false,
      isProjectCreate: false,
    });
  };

  onOpenDrawer = () => {
    this.setState({ isDrawerOpen: true });
  };

  closeDialog = () => this.setState({ isDialogOpen: false });

  openDialog = () => this.setState({ isDialogOpen: true });

  renderDialog = () => (
    <ModalDialog
      isOpen
      onDialogDismissed={this.closeDialog}
      header={<h1>Modal Dialog</h1>}
    >
      <DialogContent>
        I am a dialog. You can close me with Esc.
      </DialogContent>
    </ModalDialog>
  );

  renderDrawerItems = () => (
    <AkNavigationItemGroup>
      {drawerOptions.map(({ label, id, Icon }) => (
        <AkNavigationItem
          key={id}
          text={label}
          onClick={() => this.onItemClick(id)}
          icon={<Icon label={label} />}
        />
      ))}
    </AkNavigationItemGroup>
  );

  renderFocusedTaskContent = () => (
    <FocusedTaskContentWrapper>
      <Button shouldFitContainer appearance="primary" onClick={this.openDialog}>
        Open a popup dialog
      </Button>
      {this.state.isDialogOpen ? this.renderDialog() : null}
    </FocusedTaskContentWrapper>
  );

  render() {
    const {
      isDrawerOpen,
      isProjectCreate,
    } = this.state;
    const backIcon = <ArrowleftIcon label="Close" />;
    const primaryIcon = <JiraIcon size="xlarge" />;
    const addIcon = <AddIcon label="Add" />;

    const drawers = [
      <AkCreateDrawer
        key="create-drawer"
        backIcon={backIcon}
        primaryIcon={primaryIcon}
        isOpen={isDrawerOpen}
        isFullWidth={isProjectCreate}
        onBackButton={this.onCloseDrawer}
      >
        {isProjectCreate ? this.renderFocusedTaskContent() : this.renderDrawerItems()}
      </AkCreateDrawer>,
    ];

    return (
      <Navigation
        id="global-navigation"
        drawers={drawers}
        isOpen={false}
        globalCreateIcon={addIcon}
        globalPrimaryIcon={primaryIcon}
        containerHeaderComponent={null}
        onCreateDrawerOpen={this.onOpenDrawer}
        onCreateDrawerClose={this.onCloseDrawer}
        isCollapsible
      >
        <div />
      </Navigation>
    );
  }
}

export default FocusedTaskExample;
