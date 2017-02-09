import { shallow } from 'enzyme';
import React from 'react';
import Navigation from '../src/components/js/Navigation';

describe('<Navigation />', () => {
  describe('rendered widths', () => {
    [
      {
        isOpen: false,
        width: 0,
        expectedRenderedWidth: 64,
      },
      {
        isOpen: false,
        width: 128,
        expectedRenderedWidth: 64,
      },
      {
        isOpen: false,
        width: 300,
        expectedRenderedWidth: 64,
      },
      {
        isOpen: true,
        width: 0,
        expectedRenderedWidth: 64,
      },
      {
        isOpen: true,
        width: 63,
        expectedRenderedWidth: 64,
      },
      {
        isOpen: true,
        width: 64,
        expectedRenderedWidth: 64,
      },
      {
        isOpen: true,
        width: 65,
        expectedRenderedWidth: 65,
      },
      {
        isOpen: true,
        width: 173,
        expectedRenderedWidth: 173,
      },
      {
        isOpen: true,
        width: 174,
        expectedRenderedWidth: 174,
      },
      {
        isOpen: true,
        width: 175,
        expectedRenderedWidth: 175,
      },
      {
        isOpen: true,
        width: 333,
        expectedRenderedWidth: 333,
      },
      {
        isOpen: true,
        width: 334,
        expectedRenderedWidth: 334,
      },
      {
        isOpen: true,
        width: 335,
        expectedRenderedWidth: 335,
      },
    ].forEach(({ isOpen, width, expectedRenderedWidth }) => {
      it(`with isOpen=${isOpen} and width=${width}, rendered width is ${expectedRenderedWidth}`, () => {
        const navigation = shallow(<Navigation isOpen={isOpen} width={width} />);
        expect(navigation.find('Spacer').props().width).to.equal(expectedRenderedWidth);
      });
    });
  });

  describe('snapping', () => {
    const assertSnappingBehaviour = ({ initial, drag, expected }) => {
      it(`starting at width=${initial.width}px and isOpen=${initial.isOpen},
        dragging by ${drag}px results in width=${expected.width}px and isOpen=${expected.isOpen}
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
        navigation.find('Resizer').simulate('resize', drag);
        navigation.find('Resizer').simulate('resizeEnd');
      });
    };

    const collapsed = [
      {
        initial: {
          width: 64,
          isOpen: false,
        },
        drag: -50,
        expected: {
          width: 64,
          isOpen: false,
        },
      },
      {
        initial: {
          width: 64,
          isOpen: false,
        },
        drag: 50,
        expected: {
          width: 64,
          isOpen: false,
        },
      },
      {
        initial: {
          width: 64,
          isOpen: false,
        },
        drag: 109,
        expected: {
          width: 64,
          isOpen: false,
        },
      },
      {
        initial: {
          width: 64,
          isOpen: false,
        },
        drag: 110,
        expected: {
          width: 284,
          isOpen: true,
        },
      },
      {
        initial: {
          width: 64,
          isOpen: false,
        },
        drag: 111,
        expected: {
          width: 284,
          isOpen: true,
        },
      },
      {
        initial: {
          width: 64,
          isOpen: false,
        },
        drag: 219,
        expected: {
          width: 284,
          isOpen: true,
        },
      },
      {
        initial: {
          width: 64,
          isOpen: false,
        },
        drag: 220,
        expected: {
          width: 284,
          isOpen: true,
        },
      },
      {
        initial: {
          width: 64,
          isOpen: false,
        },
        drag: 221,
        expected: {
          width: 285,
          isOpen: true,
        },
      },
      {
        initial: {
          width: 64,
          isOpen: false,
        },
        drag: 500,
        expected: {
          width: 564,
          isOpen: true,
        },
      },
    ];
    const open = [
      {
        initial: {
          width: 284,
          isOpen: true,
        },
        drag: -10,
        expected: {
          width: 284,
          isOpen: true,
        },
      },
      {
        initial: {
          width: 284,
          isOpen: true,
        },
        drag: -110,
        expected: {
          width: 284,
          isOpen: true,
        },
      },
      {
        initial: {
          width: 284,
          isOpen: true,
        },
        drag: -111,
        expected: {
          width: 64,
          isOpen: false,
        },
      },
      {
        initial: {
          width: 284,
          isOpen: true,
        },
        drag: -120,
        expected: {
          width: 64,
          isOpen: false,
        },
      },
      {
        initial: {
          width: 284,
          isOpen: true,
        },
        drag: -121,
        expected: {
          width: 64,
          isOpen: false,
        },
      },
    ];
    const expanded = [
      {
        initial: {
          width: 500,
          isOpen: true,
        },
        drag: -10,
        expected: {
          width: 490,
          isOpen: true,
        },
      },
      {
        initial: {
          width: 500,
          isOpen: true,
        },
        drag: -216,
        expected: {
          width: 284,
          isOpen: true,
        },
      },
      {
        initial: {
          width: 500,
          isOpen: true,
        },
        drag: -217,
        expected: {
          width: 284,
          isOpen: true,
        },
      },
      {
        initial: {
          width: 500,
          isOpen: true,
        },
        drag: -326,
        expected: {
          width: 284,
          isOpen: true,
        },
      },
      {
        initial: {
          width: 500,
          isOpen: true,
        },
        drag: -327,
        expected: {
          width: 64,
          isOpen: false,
        },
      },
      {
        initial: {
          width: 500,
          isOpen: true,
        },
        drag: -500,
        expected: {
          width: 64,
          isOpen: false,
        },
      },
      {
        initial: {
          width: 500,
          isOpen: true,
        },
        drag: -600,
        expected: {
          width: 64,
          isOpen: false,
        },
      },
    ];

    collapsed.forEach(assertSnappingBehaviour);
    open.forEach(assertSnappingBehaviour);
    expanded.forEach(assertSnappingBehaviour);
  });
});
