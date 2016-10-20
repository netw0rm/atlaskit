import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import calculateCollapseProperties from '../../src/internal/collapse-properties';

import {
  expandedWidth,
  globalCollapsedWidth,
  containerCollapsedWidth,
  containerPaddingExpanded,
  containerPaddingCollapsed,
} from '../../src/shared-variables';

chai.use(chaiAsPromised);
chai.should();
const expect = chai.expect;

describe('collapse-properties', () => {
  it('open=true', () => {
    const { visibleWidth, totalWidth, xOffset, containerPadding } = calculateCollapseProperties({
      open: true,
      resizeDelta: 0,
      containerHidden: false,
    });

    expect(visibleWidth).to.equal(expandedWidth);
    expect(totalWidth).to.equal(expandedWidth);
    expect(xOffset).to.equal(0);
    expect(containerPadding).to.equal(containerPaddingExpanded);
  });
  it('open=false', () => {
    const { visibleWidth, totalWidth, xOffset, containerPadding } = calculateCollapseProperties({
      open: false,
      resizeDelta: 0,
      containerHidden: false,
    });

    expect(visibleWidth).to.equal(globalCollapsedWidth, 'visibleWidth');
    expect(totalWidth).to.equal(globalCollapsedWidth + containerCollapsedWidth, 'totalWidth');
    expect(xOffset).to.equal(-globalCollapsedWidth, 'xOffset');
    expect(containerPadding).to.equal(containerPaddingCollapsed, 'containerPadding');
  });
  it('if containerHidden=true, open has no impact', () => {
    const { visibleWidth } = calculateCollapseProperties({
      open: true,
      resizeDelta: 0,
      containerHidden: true,
    });
    const { visibleWidth: visibleWidthWithDelta } = calculateCollapseProperties({
      open: true,
      resizeDelta: -20,
      containerHidden: true,
    });

    expect(visibleWidth).to.equal(globalCollapsedWidth);
    expect(visibleWidthWithDelta).to.equal(globalCollapsedWidth);
  });
  it('if containerHidden=true, resizeDelta has no impact', () => {
    const { visibleWidth } = calculateCollapseProperties({
      open: true,
      resizeDelta: 0,
      containerHidden: true,
    });
    const { visibleWidth: visibleWidthWithDelta } = calculateCollapseProperties({
      open: true,
      resizeDelta: -20,
      containerHidden: true,
    });

    expect(visibleWidth).to.equal(globalCollapsedWidth);
    expect(visibleWidthWithDelta).to.equal(globalCollapsedWidth);
  });
  it('if containerHidden=false and open=true, resizeDelta impacts visible width', () => {
    const { visibleWidth } = calculateCollapseProperties({
      open: true,
      resizeDelta: -20,
      containerHidden: false,
    });

    expect(visibleWidth).to.equal(expandedWidth - 20);
  });
  it('if containerHidden=false and open=false, resizeDelta impacts visible width', () => {
    const { visibleWidth } = calculateCollapseProperties({
      open: false,
      resizeDelta: 20,
      containerHidden: false,
    });
    expect(visibleWidth).to.equal(globalCollapsedWidth + 20);
  });
  // eslint-disable-next-line max-len
  it(`containerPadding is always between ${containerPaddingCollapsed} and ${containerPaddingExpanded}`, () => {
    const { containerPadding: pad1 } = calculateCollapseProperties({
      open: true,
      resizeDelta: 0,
      containerHidden: false,
    });
    const { containerPadding: pad2 } = calculateCollapseProperties({
      open: true,
      resizeDelta: -((expandedWidth - globalCollapsedWidth) + 5),
      containerHidden: false,
    });
    const { containerPadding: pad3 } = calculateCollapseProperties({
      open: true,
      resizeDelta: -expandedWidth,
      containerHidden: false,
    });

    expect(pad1 >= containerPaddingCollapsed).to.equal(true);
    expect(pad2 >= containerPaddingCollapsed).to.equal(true);
    expect(pad3 >= containerPaddingCollapsed).to.equal(true);
    expect(pad1 <= containerPaddingExpanded).to.equal(true);
    expect(pad2 <= containerPaddingExpanded).to.equal(true);
    expect(pad3 <= containerPaddingExpanded).to.equal(true);
  });
  it(`total width is bounded by ${globalCollapsedWidth}`, () => {
    const { totalWidth } = calculateCollapseProperties({
      open: true,
      resizeDelta: -999,
      containerHidden: false,
    });

    expect(totalWidth >= globalCollapsedWidth).to.equal(true);
  });
  it(`total width is bounded by ${expandedWidth}`, () => {
    const { totalWidth } = calculateCollapseProperties({
      open: true,
      resizeDelta: 999,
      containerHidden: false,
    });

    expect(totalWidth <= expandedWidth).to.equal(true);
  });
});
