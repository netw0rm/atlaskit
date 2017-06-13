/* tslint:disable:variable-name */
import * as React from 'react';
import styled from 'styled-components';
import {storiesOf, action} from '@kadira/storybook';
import {AppCardView} from '../src/app';
import {Details, Metadata, Badge, Lozenge, Context, Action} from '../src/app/model';

const loremIpsum = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis varius mattis massa, quis ornare orci. Integer congue
rutrum velit, quis euismod eros condimentum quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
lobortis nibh id odio egestas luctus. Nunc nulla lacus, congue eu nibh non, imperdiet varius lacus. Nulla sagittis
magna et tincidunt volutpat. Nunc augue lorem, eleifend et tempor ut, malesuada ac lorem. Praesent quis feugiat eros,
et vehicula nibh. Maecenas vehicula commodo nisi, at rutrum ipsum posuere sit amet. Integer sit amet nisl sed ligula
consectetur feugiat non at ligula. Cras dignissim suscipit magna at mattis. Maecenas ante leo, feugiat vestibulum velit
a, commodo finibus velit. Maecenas interdum ullamcorper velit non suscipit. Proin tempor, magna vitae dapibus laoreet,
quam dui convallis lectus, in vestibulum arcu eros eu velit. Quisque vel dolor enim.
`;

const userJonBlower = {
  src: 'https://extranet.atlassian.com/download/attachments/2928873907/user-avatar',
  label: 'Jon Blower'
};
const userJamesNewell = {
  src: 'https://extranet.atlassian.com/download/attachments/3189817539/user-avatar',
  label: 'James Newell'
};
const userScottSimpson = {
  src: 'https://extranet.atlassian.com/download/attachments/2491694727/user-avatar',
  label: 'Scott Simpson'
};
const userSaschaReuter = {
  src: 'https://extranet.atlassian.com/download/attachments/2246873520/sreuter-57703-pp-1530510_4271148635152_5186589029777108540_n.jpg',
  label: 'Sascha Reuter'
};

const minimalDetails = {
  title: 'Sascha Reuter commented on a file: Desktop sidebar states.png'
};

const detailsWithTitle = {
  ...minimalDetails
};

const detailsWithLoooongTitle = {
  title: loremIpsum
};

const preview = 'https://image.ibb.co/ghKzoF/1a99566b0c8e0589ca327bb1efe0be5ca1419aa8.png';
const detailsWithPreview = {
  ...minimalDetails,
  preview
};

const detailsWithUser: Details = {
  ...minimalDetails,
  user: userSaschaReuter,
};

const detailsWithCollapseToggle: Details = {
  ...minimalDetails,
  collapsible: true
};

const detailsWithMetaTitleAndText: Details = {
  ...minimalDetails,
  meta: [
    {
      title: 'Modified',
      text: '10/5/2017 12:19pm'
    }
  ]
};

const storyImage = 'http://www.fellowshipgw.com/wp-content/themes/lenexabaptist/images/icon-story-gray.png';
const detailsWithMetaIconImage: Details = {
  ...minimalDetails,
  meta: [{icon: {src: storyImage, label: 'Issue type'}}]
};

const metaBadge: Badge = {
  value: 101,
  max: 99,
  appearance: 'important'
};
const detailsWithMetaBadge: Metadata = {
  ...minimalDetails,
  meta: [{badge: metaBadge}]
};

const metaLozenge: Lozenge = {
  text: 'In Progress',
  appearance: 'inprogress'
};
const detailsWithMetaLozenge: Details = {
  ...minimalDetails,
  meta: [{lozenge: metaLozenge}]
};

const metaUser = [userJamesNewell];
const detailsWithMetaAvatar: Details = {
  ...minimalDetails,
  meta: [{users: metaUser}]
};

const detailsWithDescription: Details = {
  ...minimalDetails,
  description: {text: loremIpsum}
};

const detailsWithDescriptionAndTitle: Details = {
  ...minimalDetails,
  description: {title: 'Lorem Ipsum', text: loremIpsum}
};

const metaUsers = [
  userJamesNewell,
  userJonBlower,
  userScottSimpson
];
const detailsWithMetaAvatars: Details = {
  ...minimalDetails,
  meta: [{users: metaUsers}]
};

const lotsOfMeta: Metadata[] = [
  {icon: {src: storyImage, label: 'Issue type'}, text: 'Story'},
  {badge: metaBadge},
  {lozenge: metaLozenge},
  {title: 'Watchers', users: metaUsers}
];
const detailsWithLotsOfMeta: Details = {
  ...minimalDetails,
  meta: [...lotsOfMeta, ...lotsOfMeta, ...lotsOfMeta, {text: loremIpsum}]
};

const minimalContext: Context = {
  text: 'Design Home / ... / Media Cards Design'
};

const detailsWithContext: Details = {
  ...minimalDetails,
  context: {
    ...minimalContext
  }
};

const contextIcon = 'https://image.ibb.co/jSrC8F/f4b5e33d6b1d36556114a18b594768f41f32673e.png';
const detailsWithContextWithIcon: Details = {
  ...minimalDetails,
  context: {
    ...minimalContext,
    icon: {
      src: contextIcon,
      label: 'App name'
    }
  }
};

const contextHref = 'https://confluence.atlassian.com/';
const detailsWithContextWithHref: Details = {
  ...minimalDetails,
  context: {
    ...minimalContext,
    href: contextHref
  }
};

const primaryAction: Action = {
  title: 'View',
  description: 'View the thing!',
  handler: () => action('View!')()
};
const detailsWithPrimaryAction: Details = {
  ...minimalDetails,
  actions: [primaryAction]
};

const metaActions: Action[] = [
  primaryAction,
  {
    title: 'Open',
    description: 'Open the thing!',
    handler: () => action('Open!')()
  },
  {
    title: 'Join',
    description: 'Join the thing!',
    handler: () => action('Join!')()
  },
  {
    title: 'Reply',
    description: 'Reply the thing!',
    handler: () => action('Reply!')()
  }
];
const detailsWithSecondaryActions: Details = {
  ...minimalDetails,
  actions: metaActions
};

const background = 'https://image.ibb.co/grZX8F/aabf3aedb97e60bf38525db46a87ac98323eb68d.png';
const detailsWithBackground = {
  ...minimalDetails,
  background,
};

const maximumDetails: Details = {
  collapsible: true,
  ...minimalDetails,
  user: userSaschaReuter,
  description: {title: 'Can haz description', text: loremIpsum},
  meta: [...lotsOfMeta, ...lotsOfMeta, ...lotsOfMeta],
  context: {
    ...minimalContext,
    icon: {src: contextIcon, label: 'foobar'},
    href: contextHref
  },
  actions: metaActions
};

const maximumDetailsWithPreview: Details = {
  collapsible: true,
  ...minimalDetails,
  preview,
  user: userSaschaReuter,
  meta: lotsOfMeta,
  context: {
    ...minimalContext,
    icon: {src: contextIcon, label: 'foobar'},
    href: contextHref
  },
  actions: metaActions
};

const maximumDetailsWithBackground: Details = {
  collapsible: true,
  ...minimalDetails,
  background,
  user: userSaschaReuter,
  meta: lotsOfMeta,
  context: {
    ...minimalContext,
    icon: {src: contextIcon, label: 'foobar'},
    href: contextHref
  },
  actions: metaActions
};

const confluenceActivityDetails: Details = {
  collapsible: true,
  title: 'Sascha Reuter commented on a file: Desktop sidebar states.png',
  user: userSaschaReuter,
  description: {
    title: 'Desktop sidebar states.png',
    text: 'Does the consumer actually know what a card is? Should it be "file/link" or something instead?'
  },
  context: {
    icon: {src: contextIcon, label: 'Confluence'},
    text: 'Design Home / … / Media Cards Design'
  },
  actions: [
    {title: 'Reply', description: 'Reply things', handler: () => action('Reply')()},
    {title: 'Other', description: 'Do other things', handler: () => action('Other')()}
  ]
};

const jiraIssueDetails: Details = {
  title: 'Document specifications for smart cards',
  meta: [
    {icon: {src: 'https://drive.google.com/open?id=0B1I77F_P5VV2ZmJzTzhqb2JkVkE', label: 'Issue type'}, text: 'Story'},
    {icon: {src: 'https://drive.google.com/open?id=0B1I77F_P5VV2ZmJzTzhqb2JkVkE', label: 'Priority'}, text: 'High'},
  ],
  context: {
    icon: {src: contextIcon, label: 'Jira'},
    text: 'DPM - 560'
  },
  actions: [
    {title: 'View', description: 'View things', handler: () => action('View')()},
    {title: 'Other', description: 'Do other things', handler: () => action('Other')()}
  ]
};

const dropboxFileDetails: Details = {
  title: 'media_cards_v2.0_final.sketch',
  meta: [
    {title: 'Modified', text: '10/5/2017 12:19 PM'},
    {icon: {src: 'http://www.freeiconspng.com/uploads/links-icon-10.png', label: 'Members'}, text: '34 members'}
  ],
  context: {
    icon: {src: 'https://cfl.dropboxstatic.com/static/images/brand/glyph-vflK-Wlfk.png', label: 'Dropbox'},
    text: 'Dropbox'
  },
  actions: [
    {title: 'Download', description: 'Download the thing', handler: () => action('Download')()},
    {title: 'Other', description: 'Do the other things', handler: () => action('Other')()}
  ]
};

const trelloBoardDetails: Details = {
  background: 'https://dl.dropbox.com/s/8js2m5azvvfzpq2/background.jpg',
  title: 'Trello Community Nordics',
  meta: [
    {icon: {src: 'https://dl.dropbox.com/s/msppv8d4vrl7msj/icon_team.png', label: 'Wheel'}},
    {icon: {src: 'https://dl.dropbox.com/s/1341fwjpmjzucqk/icon_member.png', label: 'Members'}, text: '438'},
    {icon: {src: 'https://dl.dropbox.com/s/1341fwjpmjzucqk/icon_member.png', label: 'Stared'}, text: '1'},
    {icon: {src: 'https://dl.dropbox.com/s/mbqwsdc99jzj9pk/icon_activity.png', label: 'Updated'}, text: 'Apr 28'}
  ],
  context: {
    icon: {src: 'https://dl.dropbox.com/s/yrdlsc6usuwegym/icon.png', label: 'Trello'},
    text: 'Trello - Board',
    href: 'http://www.trello.com'
  },
  actions: [
    {title: 'Join', description: 'Join the thing', handler: () => action('Join')()},
    {title: 'Other', description: 'Do the other things', handler: () => action('Other')()}
  ]
};

const trelloCardDetails: Details = {
  title: 'Media viewer - Inline comment dialog concept',
  preview,
  meta: [
    {icon: {src: 'https://drive.google.com/uc?export=download&id=0B1I77F_P5VV2MDdacTFrVkxpNXc', label: 'Watch'}},
    {icon: {src: 'https://drive.google.com/uc?export=download&id=0B1I77F_P5VV2UGxCZ0c2TmRNOVk', label: 'Updated at'}, text: 'Jun 15'},
    {icon: {src: 'https://drive.google.com/uc?export=download&id=0B1I77F_P5VV2Znh0TEh1Zm1ZRnc', label: 'Align'}},
    {icon: {src: 'https://drive.google.com/uc?export=download&id=0B1I77F_P5VV2SDhVOVlTak44Q2M', label: 'Comments'}, text: '2'},
    {icon: {src: 'https://drive.google.com/uc?export=download&id=0B1I77F_P5VV2WWl2NjNDc0RaNFk', label: 'Attachments'}, text: '1'},
    {icon: {src: 'https://drive.google.com/uc?export=download&id=0B1I77F_P5VV2Y2NkOTB0RDNEVGc', label: 'Tasks'}, text: '0/1'},
    {users: [
      userJonBlower,
      userScottSimpson,
      userJamesNewell,
    ]},
  ],
  context: {
    icon: {src: 'https://dl.dropbox.com/s/yrdlsc6usuwegym/icon.png', label: 'Trello'},
    text: 'Trello - Card in list Concepts',
    href: 'http://www.trello.com'
  },
  actions: [
    {title: 'Open', description: 'Open thing', handler: () => action('Open')()},
    {title: 'Other', description: 'Do other things', handler: () => action('Other')()}
  ]
};

const FixedWidthContainer = styled.div`
  width: 450px
  border: 1px dotted orange;
`;

const SectionWrapper = styled.div`
  padding: 1rem;
`;

const SectionTitle = styled.h1`
  font-size: 1.25rem;
`;

const SectionCard = styled.div`
  margin: 1rem 0;
`;

const Section = ({title, children}: {title?: string, children?: any}) => {
  return (
    <SectionWrapper>
      {title && <SectionTitle>{title}</SectionTitle>}
      {React.Children.map(children, child => (
        <SectionCard>{child}</SectionCard>
      ))}
    </SectionWrapper>
  );
};

storiesOf('AppCardView', {})
  .add('Pieces', () => (
    <div>

      <Section>
        <AppCardView details={maximumDetails} collapsed={false}/>
      </Section>

      <Section title="With title">
        <AppCardView details={detailsWithTitle}/>
        <AppCardView details={detailsWithLoooongTitle}/>
      </Section>

      <Section title="With preview">
        <AppCardView details={detailsWithPreview}/>
        <AppCardView details={maximumDetailsWithPreview} collapsed={false}/>
      </Section>

      <Section title="With user">
        <AppCardView details={detailsWithUser}/>
      </Section>

      <Section title="With description">
        <AppCardView details={detailsWithDescription}/>
        <AppCardView details={detailsWithDescriptionAndTitle}/>
      </Section>

      <Section title="With collapse toggle">
        <AppCardView details={detailsWithCollapseToggle}/>
      </Section>

      <Section title="With meta">
        <AppCardView details={detailsWithMetaTitleAndText}/>
        <AppCardView details={detailsWithMetaIconImage}/>
        <AppCardView details={detailsWithMetaBadge}/>
        <AppCardView details={detailsWithMetaLozenge}/>
        <AppCardView details={detailsWithMetaAvatar}/>
        <AppCardView details={detailsWithMetaAvatars}/>
        <AppCardView details={detailsWithLotsOfMeta}/>
      </Section>

      <Section title="With context">
        <AppCardView details={detailsWithContext}/>
        <AppCardView details={detailsWithContextWithIcon}/>
        <AppCardView details={detailsWithContextWithHref}/>
      </Section>

      <Section title="With actions">
        <AppCardView details={detailsWithPrimaryAction}/>
        <AppCardView details={detailsWithSecondaryActions}/>
      </Section>

      <Section title="With background">
        <AppCardView details={detailsWithBackground}/>
        <AppCardView details={maximumDetailsWithBackground} collapsed={false}/>
      </Section>

      <FixedWidthContainer>
        <Section title="In a container">

          <AppCardView details={{title: 'Short title'}}/>
          <AppCardView details={{title: 'Just long enough to wrap inside the container: blah blah blah'}}/>
          <AppCardView details={{title: `Super long title, longer than the card max-width: ${loremIpsum}`}}/>

          <AppCardView details={{title: 'Short description', description: {text: 'hi'}}}/>
          <AppCardView
            details={{title: 'Just long enough to wrap inside the container description', description: {
              text: 'blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah'
            }}}
          />
          <AppCardView details={{title: `Super long description`, description: {text: loremIpsum}}}/>

          <AppCardView details={detailsWithLotsOfMeta}/>
          <AppCardView details={{preview, ...maximumDetails}} collapsed={false}/>

        </Section>
      </FixedWidthContainer>

    </div>
  ))
  .add('Examples', () => (
    <div>

      <Section title="Confluence">
        <AppCardView details={confluenceActivityDetails}/>
        <AppCardView details={confluenceActivityDetails} collapsed={false}/>
      </Section>


      <Section title="Jira">
        <AppCardView details={jiraIssueDetails}/>
      </Section>

      <Section title="Dropbox">
        <AppCardView details={dropboxFileDetails}/>
      </Section>

      <Section title="Trello">
        <AppCardView details={trelloBoardDetails}/>
        <AppCardView details={trelloCardDetails}/>
      </Section>

    </div>
  ))
;
