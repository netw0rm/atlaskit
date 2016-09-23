import Alignment from '../src/internal/Alignment';

describe('alignment', () => {
  it('should be possible to create a new instance', () => {
    expect(() => (new Alignment({}))).not.to.throw(Error);
  });

  describe('properties', () => {
    const align = new Alignment({});

    it('attachmentMap', () => {
      [
        'top left', 'top center', 'top right', 'right top', 'right middle', 'right bottom',
        'bottom left', 'bottom center', 'bottom right', 'left top', 'left middle', 'left bottom',
      ].forEach((val) =>
        expect(Alignment.attachmentMap[val]).not.to.equal(undefined)
      );
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

    it('reposition', () => {
      expect(align.reposition).not.to.equal(undefined);
    });
    it('destroy', () => {
      expect(align.destroy).not.to.equal(undefined);
    });
  });
});
