import reactify from 'skatejs-react-integration';

/**
 * Turn an atlaskit web component into a react component
 * @param {!object} webComponent the atlaskit web component
 * @param {!{React: object, ReactDOM: object}} options
 *          - React: the instance of React to register with
 *          - ReactDOM: the instance of ReactDOM to register with
 */

interface Options {
  React: any;
  ReactDOM: any;
}

const defaultOptions: Options = {
  React: (window as any).React,
  ReactDOM: (window as any).ReactDOM,
};

export default (webComponent: any, options: Options = defaultOptions): any => reactify(webComponent, options);
