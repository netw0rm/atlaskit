import { vdom, define } from 'skatejs';


// component parts
import Root from './Root';
import Content from './Content';
import Metadata from './Metadata';

import AvatarSlot from './slots/Avatar';
import DefaultSlot from './slots/Default';
import AuthorSlot from './slots/Author';
import TimeSlot from './slots/Time';
import ActionsSlot from './slots/Actions';
import ReplySlot from './slots/Reply';

import 'style!./host.less';

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class AkComment
 * @example @js import AkComment from 'ak-comment';
 * const component = new AkComment();
 */
export default define('ak-comment', {
  render() {
    return (
      <Root>
        <AvatarSlot />
        <Content>
          <DefaultSlot />
          <Metadata>
            <AuthorSlot />
            <TimeSlot />
            <ActionsSlot />
          </Metadata>
          <ReplySlot />
        </Content>
      </Root>
    );
  },
});
