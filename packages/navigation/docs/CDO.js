import React from 'react';
import BitbucketBranchesIcon from '@atlaskit/icon/glyph/bitbucket/branches';
import PageIcon from '@atlaskit/icon/glyph/page';
import EmojiObjectsIcon from '@atlaskit/icon/glyph/emoji/objects';
import EmojiNatureIcon from '@atlaskit/icon/glyph/emoji/nature';
import EmojiTravelIcon from '@atlaskit/icon/glyph/emoji/travel';
import ExpandIcon from '@atlaskit/icon/glyph/chevron-down';
import { AkNavigationItem, AkNavigationItemGroup } from '../src/index';
import BasicNavigation from '../stories/components/BasicNavigation';

export default () => (
  <BasicNavigation
    createDrawerContent={(
      <div>
        <AkNavigationItemGroup>
          <AkNavigationItem
            href="#1"
            icon={<EmojiObjectsIcon />}
            text="Create item 1"
          />
          <AkNavigationItem
            href="#2"
            icon={<EmojiNatureIcon />}
            text="Create item 2"
          />
          <AkNavigationItem
            href="#3"
            icon={<EmojiObjectsIcon />}
            text="Create item 3"
          />
          <AkNavigationItem
            href="#4"
            icon={<EmojiTravelIcon />}
            text="Create item 4"
          />
        </AkNavigationItemGroup>
        <AkNavigationItemGroup>
          <AkNavigationItem
            icon={<ExpandIcon />}
            text="See more"
          />
        </AkNavigationItemGroup>
        <AkNavigationItemGroup title="Group with title">
          <AkNavigationItem
            icon={<BitbucketBranchesIcon />}
            text={<span>Create a <strong>Bitbucket branch</strong></span>}
          />
          <AkNavigationItem
            icon={<PageIcon />}
            text={<span>Create a <strong>Confluence page</strong></span>}
          />
        </AkNavigationItemGroup>
      </div>
    )}
    openDrawer="create"
  />
);
