import Chrome from './Chrome';
import Code from './Code';
import Description from './Description';
import DynamicProps from './DynamicProps';
import Heading from './Heading';
import Props from './Props';
import Readme from './Readme';

/*

# Notes

The https://github.com/storybooks/react-storybook-addon-info addon only
displayed a tiny question mark (?) in the upper right corner that the viewer
had to click if they wanted to view the information we decorated the story
with. Unfortunatley it didn't seem there was any way to disable this.

There was https://github.com/tuchk4/storybook-readme but it, too, didn't render
how we wanted it to.

I tried using https://github.com/FormidableLabs/component-playground but I
couldn't get past an ambiguous error about ref, mounting and the possibility of
having multiple copies of React on the page. When I searched for issues, I
found https://github.com/FormidableLabs/component-playground/issues/67 but
there wasn't a resolution or much activity on it.

Styles are currently done with inline styles because I didn't want to boil the
ocean and it was the simplest way.

*/

export default Readme;
export { Chrome, Code, Description, DynamicProps, Heading, Props };
