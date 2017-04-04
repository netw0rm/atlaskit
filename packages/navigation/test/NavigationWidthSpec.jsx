import { shallow } from 'enzyme';
import React from 'react';
import Navigation from '../src/components/js/Navigation';

/**
 *  Note: these are duplicated from the Navigation code
 * to ensure that tests fail when the variable is changed */
const navigationOpenWidth = 304;
const navigationClosedWidth = 64;
const navigationSnapOpenBreakpoint = 184;

describe('<Navigation />', () => {
  describe('rendered widths', () => {
    [
      {
        isOpen: false,
        width: -50,
        expectedRenderedWidth: navigationClosedWidth,
      },
      {
        isOpen: false,
        width: 0,
        expectedRenderedWidth: navigationClosedWidth,
      },
      {
        isOpen: false,
        width: 128,
        expectedRenderedWidth: navigationClosedWidth,
      },
      {
        isOpen: false,
        width: 300,
        expectedRenderedWidth: navigationClosedWidth,
      },
      {
        isOpen: true,
        width: 0,
        expectedRenderedWidth: navigationClosedWidth,
      },
      {
        isOpen: true,
        width: navigationClosedWidth - 1,
        expectedRenderedWidth: navigationClosedWidth,
      },
      {
        isOpen: true,
        width: navigationClosedWidth,
        expectedRenderedWidth: navigationClosedWidth,
      },
      {
        isOpen: true,
        width: navigationClosedWidth + 1,
        expectedRenderedWidth: navigationClosedWidth + 1,
      },
      {
        isOpen: true,
        width: navigationSnapOpenBreakpoint - 1,
        expectedRenderedWidth: navigationSnapOpenBreakpoint - 1,
      },
      {
        isOpen: true,
        width: navigationSnapOpenBreakpoint,
        expectedRenderedWidth: navigationSnapOpenBreakpoint,
      },
      {
        isOpen: true,
        width: navigationSnapOpenBreakpoint + 1,
        expectedRenderedWidth: navigationSnapOpenBreakpoint + 1,
      },
      {
        isOpen: true,
        width: 5000,
        expectedRenderedWidth: 5000,
      },
    ].forEach(({ isOpen, width, expectedRenderedWidth }) => {
      it(`with isOpen=${isOpen} and width=${width}, rendered width is ${expectedRenderedWidth}`, () => {
        const navigation = shallow(<Navigation isOpen={isOpen} width={width} />);
        expect(navigation.find('Spacer').props().width).to.equal(expectedRenderedWidth);
      });
    });
  });

  describe('snapping', () => {
    const assertSnappingBehaviour = ({ initial, draggedWidth, expected }) => {
      it(`starting at width=${initial.width}px and isOpen=${initial.isOpen},
        dragging to ${draggedWidth}px results in width=${expected.width}px and isOpen=${expected.isOpen}
        being passed to the onResize handler`, (done) => {
        const navigation = shallow(<Navigation />);
        navigation.setProps({
          isOpen: initial.isOpen,
          width: initial.width,
          onResize: (args) => {
            expect(args).to.deep.equal(expected);
            done();
          },
        });
        navigation.find('Resizer').simulate('resizeStart');
        navigation.find('Resizer').simulate('resize', (draggedWidth - initial.width));
        navigation.find('Resizer').simulate('resizeEnd');
      });
    };

    const collapsedState = {
      width: navigationClosedWidth,
      isOpen: false,
    };

    const openState = {
      width: navigationOpenWidth,
      isOpen: true,
    };

    const expandedState = {
      width: 500,
      isOpen: true,
    };

    const scenarios = [
      {
        draggedWidth: -50,
        expected: collapsedState,
      },
      {
        draggedWidth: 0,
        expected: collapsedState,
      },
      {
        draggedWidth: navigationClosedWidth - 1,
        expected: collapsedState,
      },
      {
        draggedWidth: navigationClosedWidth,
        expected: collapsedState,
      },
      {
        draggedWidth: navigationClosedWidth + 1,
        expected: collapsedState,
      },
      {
        draggedWidth: navigationSnapOpenBreakpoint - 1,
        expected: collapsedState,
      },
      {
        draggedWidth: navigationSnapOpenBreakpoint,
        expected: openState,
      },
      {
        draggedWidth: navigationSnapOpenBreakpoint + 1,
        expected: openState,
      },
      {
        draggedWidth: navigationOpenWidth - 1,
        expected: openState,
      },
      {
        draggedWidth: navigationOpenWidth,
        expected: openState,
      },
      {
        draggedWidth: navigationOpenWidth + 1,
        expected: {
          width: navigationOpenWidth + 1,
          isOpen: true,
        },
      },
      {
        draggedWidth: 500,
        expected: {
          width: 500,
          isOpen: true,
        },
      },
    ];

    function makeScenario(initial) {
      return scenarios.map(({ draggedWidth, expected }) => ({
        initial,
        draggedWidth,
        expected,
      }));
    }

    makeScenario(collapsedState).forEach(assertSnappingBehaviour);
    makeScenario(openState).forEach(assertSnappingBehaviour);
    makeScenario(expandedState).forEach(assertSnappingBehaviour);
  });
});
