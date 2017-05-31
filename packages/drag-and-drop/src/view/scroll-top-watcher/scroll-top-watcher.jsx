// @flow
import { PureComponent } from 'react';
import memoizeOne from 'memoize-one';
import invariant from 'invariant';
import { connect } from 'react-redux';
import storeKey from '../../state/get-store-key';
import { updateDimensionScrollTop } from '../../state/action-creators';
import type { DroppableId } from '../../types';

export type ConnectedProps = {|
  droppableId: DroppableId,
  shouldPublish: boolean,
  targetRef: ?Element,
  children?: React$Element<any>,
|}

export type DispatchProps = {|
  update: typeof updateDimensionScrollTop,
|}

export type MapProps = {||};

type Props = ConnectedProps & DispatchProps & MapProps;

class ScrollTopWatcher extends PureComponent {
  /* eslint-disable react/sort-comp */
  props: Props
  frameId: ?number
  memoizedPublish: (scrollTop: number) => void
  /* eslint-enable */

  constructor(props: Props, context: any) {
    super(props, context);

    this.frameId = null;

    // only publish if arguments change
    this.memoizedPublish = memoizeOne(this.publish);
  }

  componentWillUpdate(nextProps) {
    // turning publish on
    if (!this.props.shouldPublish && nextProps.shouldPublish) {
      this.start();
    }

    // turn publish off
    if (this.props.shouldPublish && !nextProps.shouldPublish) {
      this.stop();
    }

    // TODO: check if there is a frameId but targetRef is changing / being removed
  }

  start() {
    invariant(!this.frameId, 'should not be starting a new scrollTop poller if there is already one occuring');
    this.loop();
  }

  stop() {
    invariant(this.frameId, 'cannot stop requesting scrollTop if there is no frame');
    window.cancelAnimationFrame(this.frameId);
    this.frameId = null;
  }

  publish = (scrollTop: number) => {
    const { update, droppableId } = this.props;
    update(droppableId, scrollTop);
  }

  loop = () => {
    // frame cancelled
    const { targetRef } = this.props;
    invariant(targetRef, 'cannot get scrollTop without a ref');

    this.memoizedPublish(targetRef.scrollTop);
    this.frameId = requestAnimationFrame(this.loop);
  }

  render() {
    return this.props.children;
  }
}

const mapDispatchToProps: DispatchProps = {
  update: updateDimensionScrollTop,
};

export default connect(null, mapDispatchToProps, null, { storeKey })(ScrollTopWatcher);
