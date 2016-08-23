import { storiesOf, action } from '@kadira/storybook';
import reactify from 'akutil-react';
import AkComment from '../src/index';
const { React, ReactDOM } = window;
import { name } from '../package.json';
import styles from 'style!./../src/host.less';

const Comment = reactify(AkComment, {
  React,
  ReactDOM,
});

storiesOf(name, module)
  .add('a simple ak-comment', () => (
    <Comment>
      <div ref={e => e.setAttribute('slot', 'avatar')}>1 avatar</div>
      <div ref={e => e.setAttribute('slot', 'author')}>2 author</div>
      <div ref={e => e.setAttribute('slot', 'time')}>3 time</div>
      <div ref={e => e.setAttribute('slot', 'reply')}><p>6 reply</p></div>
      <div ref={e => e.setAttribute('slot', 'actions')}><a href="#">5 actions</a></div>
      <p>4 default</p>
    </Comment>
  ))
  .add('sean', () => (
    <div color="red" foo="bar" data-foo="bar">baz</div>
  ))
  .add('a simple ak-comment with a name', () => (
    <Comment name="MyComponent" />
  ))
  .add('an ak-comment that emits an action when it is clicked', () => (
    <Comment id="myComponent" onClick={action('clicking the WebComponent')} />
  ))
  .add('an ak-comment that removes itself when being clicked', () => {
    const removeMe = (e) => e.currentTarget.parentNode.removeChild(e.currentTarget);
    const cls = styles.akutilComponentTemplate;
    return (<Comment id="myComponent" className={cls} onClick={removeMe} />);
  })
  .addMonkeyTest('a ak-comment with monkey testing', () => (
    // Use this to add a story that has fuzzy testing attached.
    <Comment />
  ))
  .addMonitored('an ak-comment with monitored performance', () => (
    // Use this to add a story that has a little fps/memory gauge that allows you
    // to monitor performance whilst developing
    <Comment />
  ), () => {
    // This is where the actual work is done - anything in here will be monitored by the stats
    // view and displayed, so this is where you want to do your animation work, etc.
    const x = Math.random() * 1000000;
    for (let i = 0; i < x; i++) {
      Math.random(); // burn some CPU cycles
    }
  });
