import Alignment from '../src/Alignment';

describe('aui/internal/alignment', () => {
  it('should be possible to create a new instance', () => {
    let align;
    expect(() => {
      align = new Alignment({});
    }).not.to.throw(Error);
    expect(align.disabled).to.equal(false);
  });

  it('shouldn`t enable the positioning without a target', () => {
    const align = new Alignment({});
    expect(align.tether).to.equal(undefined);
  });

  it('should have all the properties', () => {
    const align = new Alignment({});
    expect(Alignment.attachmentMap).not.to.equal(undefined);
    expect(Alignment.defaultConstraint).not.to.equal(undefined);
    expect(Alignment.defaultPosition).not.to.equal(undefined);
    expect(Alignment.getElement).not.to.equal(undefined);

    expect(align.getPositionFromClasses).not.to.equal(undefined);
    expect(align.reposition).not.to.equal(undefined);
    expect(align.update).not.to.equal(undefined);
    expect(align.enable).not.to.equal(undefined);
    expect(align.destroy).not.to.equal(undefined);
    expect(align.disable).not.to.equal(undefined);
    expect(align.constructor).not.to.equal(undefined);
  });

  describe('properties', () => {
    const align = new Alignment({});

    it('attachmentMap', () => {
      [
        'top left', 'top center', 'top right', 'right top', 'right middle', 'right bottom',
        'bottom left', 'bottom center', 'bottom right', 'left top', 'left middle', 'left bottom',
      ].forEach((val) => {
        expect(Alignment.attachmentMap[val]).not.to.equal(undefined);
      });
    });
    it('defaultConstraint', () => {
      expect(Alignment.defaultConstraint).to.equal('window');
    });
    it('defaultPosition', () => {
      expect(Alignment.defaultPosition).to.equal('right middle');
    });
    it('getElement', () => {
      const div = document.createElement('div');
      div.setAttribute('id', 'test');
      document.body.appendChild(div);

      expect(Alignment.getElement(div)).to.equal(div);
      expect(Alignment.getElement()).to.equal(document.body);
      expect(Alignment.getElement('#test')).to.equal(div);
      expect(Alignment.getElement('#non-existing-test')).to.equal(undefined);
    });

    // this is completely Tether-dependent
    // if we switch from it some day than the test should be removed
    it('getPositionFromClasses', () => {
      const classes = [
        {
          value: 'tether-element tether-element-attached-top tether-element-attached-right tether-target-attached-top tether-target-attached-left tether-enabled tether-abutted tether-abutted-top', // eslint-disable-line max-len
          position: 'left top',
        },
        {
          value: 'tether-element tether-element-attached-middle tether-element-attached-right tether-target-attached-middle tether-target-attached-left tether-enabled', // eslint-disable-line max-len
          position: 'left middle',
        },
        {
          value: 'tether-element tether-element-attached-bottom tether-element-attached-right tether-target-attached-bottom tether-target-attached-left tether-enabled', // eslint-disable-line max-len
          position: 'left bottom',
        },
        {
          value: 'tether-element tether-element-attached-left tether-target-attached-left tether-element-attached-bottom tether-target-attached-top tether-enabled', // eslint-disable-line max-len
          position: 'top left',
        },
        {
          value: 'tether-element tether-element-attached-center tether-target-attached-center tether-element-attached-bottom tether-target-attached-top tether-enabled', // eslint-disable-line max-len
          position: 'top center',
        },
        {
          value: 'tether-element tether-element-attached-right tether-target-attached-right tether-element-attached-bottom tether-target-attached-top tether-enabled', // eslint-disable-line max-len
          position: 'top right',
        },
        {
          value: 'tether-element tether-element-attached-top tether-element-attached-left tether-target-attached-top tether-target-attached-right tether-enabled', // eslint-disable-line max-len
          position: 'right top',
        },
        {
          value: 'tether-element tether-element-attached-middle tether-element-attached-left tether-target-attached-middle tether-target-attached-right tether-enabled', // eslint-disable-line max-len
          position: 'right middle',
        },
        {
          value: 'tether-element tether-element-attached-bottom tether-element-attached-left tether-target-attached-bottom tether-target-attached-right tether-enabled', // eslint-disable-line max-len
          position: 'right bottom',
        },
        {
          value: 'tether-element tether-element-attached-left tether-target-attached-left tether-element-attached-top tether-target-attached-bottom tether-enabled', // eslint-disable-line max-len
          position: 'bottom left',
        },
        {
          value: 'tether-element tether-element-attached-center tether-target-attached-center tether-element-attached-top tether-target-attached-bottom tether-enabled', // eslint-disable-line max-len
          position: 'bottom center',
        },
        {
          value: 'tether-element tether-element-attached-right tether-target-attached-right tether-element-attached-top tether-target-attached-bottom tether-enabled', // eslint-disable-line max-len
          position: 'bottom right',
        },
        {
          value: 'some-weird-value-without-tether',
          position: '',
        },
        {
          value: 'tether-element tether-element-attached-right tether-enabled',
          position: '',
        },
        {
          value: 'tether-element tether-element-attached-right tether-target-attached-right',
          position: '',
        },
        {
          value: 'tether-element tether-element-attached-right tether-target-attached-right tether-element-attached-top', // eslint-disable-line max-len
          position: '',
        },
        {
          value: '',
          position: '',
        },
        {
          value: null,
          position: '',
        },
        {
          value: undefined,
          position: '',
        },
        {
          value: 'tether-element-attached-right      tether-target-attached-right      tether-element-attached-top     tether-target-attached-bottom', // eslint-disable-line max-len
          position: 'bottom right',
        },
      ];
      classes.forEach((val) => {
        expect(align.getPositionFromClasses(val.value)).to.equal(val.position);
      });
    });
    it('reposition', () => {
      expect(align.reposition).not.to.equal(undefined);
    });
    it('update', () => {
      expect(align.update).not.to.equal(undefined);
    });
    it('enable', () => {
      expect(align.enable).not.to.equal(undefined);
    });
    it('destroy', () => {
      expect(align.destroy).not.to.equal(undefined);
    });
    it('disable', () => {
      expect(align.disable).not.to.equal(undefined);
    });
  });
});
