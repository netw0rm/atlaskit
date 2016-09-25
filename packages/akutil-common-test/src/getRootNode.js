import { getShadowRoot } from './';

export default function getRootNode(component) {
  return getShadowRoot(component).firstChild;
}
