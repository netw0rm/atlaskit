import styles from './style.less'; // import our css using es6 imports
import seanButtonNew from 'sean-button';
import joschableHeader from 'joschable-header';

// create a 'josshable-content'
export default () => {
  const content = document.createElement('div');
  const header = joschableHeader();
  const anotherButton = seanButtonNew(3, 2);

  content.classList.add(styles.joshableContent);

  content.innerHTML += 'content v1.0.0';
  content.appendChild(header);
  content.appendChild(anotherButton);

  return content;
};
