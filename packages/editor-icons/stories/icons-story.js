import { storiesOf } from '@kadira/storybook';
import { define, vdom, state } from 'skatejs';
const { React, ReactDOM } = window;
import reactify from 'akutil-react';
import styles from './styles.css'
import addIconComponent from '../dist/add'
import alignCenterIconComponent from '../dist/alignCenter'
import alignLeftIconComponent from '../dist/alignLeft'
import alignRightIconComponent from '../dist/alignRight'
import attachmentIconComponent from '../dist/attachment'
import boldIconComponent from '../dist/bold'
import bulletListIconComponent from '../dist/bulletList'
import codeIconComponent from '../dist/code'
import dateIconComponent from '../dist/date'
import decisionIconComponent from '../dist/decision'
import emojiIconComponent from '../dist/emoji'
import expandIconComponent from '../dist/expand'
import helpIconComponent from '../dist/help'
import imageIconComponent from '../dist/image'
import indentIconComponent from '../dist/indent'
import italicIconComponent from '../dist/italic'
import linkIconComponent from '../dist/link'
import mentionIconComponent from '../dist/mention'
import moreIconComponent from '../dist/more'
import numberListIconComponent from '../dist/numberList'
import openIconComponent from '../dist/open'
import outdentIconComponent from '../dist/outdent'
import redoIconComponent from '../dist/redo'
import tableIconComponent from '../dist/table'
import taskIconComponent from '../dist/task'
import textColorIconComponent from '../dist/textColor'
import underlineIconComponent from '../dist/underline'
import undoIconComponent from '../dist/undo'
import unlinkIconComponent from '../dist/unlink'

const react = (component) => reactify(component, { React, ReactDOM, });

const AddIcon = react(addIconComponent);
const AlignCenterIcon = react(alignCenterIconComponent);
const AlignLeftIcon = react(alignLeftIconComponent);
const AlignRightIcon = react(alignRightIconComponent);
const AttachmentIcon = react(attachmentIconComponent);
const BoldIcon = react(boldIconComponent);
const BulletListIcon = react(bulletListIconComponent);
const CodeIcon = react(codeIconComponent);
const DateIcon = react(dateIconComponent);
const DecisionIcon = react(decisionIconComponent);
const EmojiIcon = react(emojiIconComponent);
const ExpandIcon = react(expandIconComponent);
const HelpIcon = react(helpIconComponent);
const ImageIcon = react(imageIconComponent);
const IndentIcon = react(indentIconComponent);
const ItalicIcon = react(italicIconComponent);
const LinkIcon = react(linkIconComponent);
const MentionIcon = react(mentionIconComponent);
const MoreIcon = react(moreIconComponent);
const NumberListIcon = react(numberListIconComponent);
const OpenIcon = react(openIconComponent);
const OutdentIcon = react(outdentIconComponent);
const RedoIcon = react(redoIconComponent);
const TableIcon = react(tableIconComponent);
const TaskIcon = react(taskIconComponent);
const TextColorIcon = react(textColorIconComponent);
const UnderlineIcon = react(underlineIconComponent);
const UndoIcon = react(undoIconComponent);
const UnlinkIcon = react(unlinkIconComponent);

storiesOf('editor-icons', module)
  .add('All icons', () => {
    return (
      <div className={styles.icons}>
        <AddIcon />
        <AlignCenterIcon />
        <AlignLeftIcon />
        <AlignRightIcon />
        <AttachmentIcon />
        <BoldIcon />
        <BulletListIcon />
        <CodeIcon />
        <DateIcon />
        <DecisionIcon />
        <EmojiIcon />
        <ExpandIcon />
        <HelpIcon />
        <ImageIcon />
        <IndentIcon />
        <ItalicIcon />
        <LinkIcon />
        <MentionIcon />
        <MoreIcon />
        <NumberListIcon />
        <OpenIcon />
        <OutdentIcon />
        <RedoIcon />
        <TableIcon />
        <TaskIcon />
        <TextColorIcon />
        <UnderlineIcon />
        <UndoIcon />
        <UnlinkIcon />
      </div>
    );
  });
