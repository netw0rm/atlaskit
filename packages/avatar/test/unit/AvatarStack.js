import * as React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Avatar from '../../src/components/Avatar';
import AvatarStack from '../../src/components/AvatarStack';
import { MoreAvatar } from '../../src/styled/AvatarStack';

describe('AvatarStack', () => {
  describe('.render()', () => {
    it('should render 0 <Avatar/>s when there are 0 avatars', () => {
      const element = shallow(<AvatarStack avatars={[]} />);
      expect(element.find(Avatar)).to.have.length(0);
    });

    it('should render 1 <Avatar/>s when there is 1 avatar', () => {
      const element = shallow(<AvatarStack avatars={[{}]} />);
      expect(element.find(Avatar)).to.have.length(1);
    });

    it('should render 3 <Avatar/>s when there are 3 avatars', () => {
      const element = shallow(<AvatarStack avatars={[{}, {}, {}]} />);
      expect(element.find(Avatar)).to.have.length(3);
    });

    it('should pass down props to each <Avatar/>', () => {
      const avatars = [
        { src: 'src1', presence: 'online', icon: <i /> },
        { src: 'src2', presence: 'offline' },
        { src: 'src3', label: 'label3' },
      ];

      const element = (
        <AvatarStack
          avatars={avatars}
          size="small"
          borderColor="red"
        />
      );
      shallow(element).find(Avatar).forEach(
        (wrapper, index) => expect(wrapper.props()).to.include({
          ...avatars[avatars.length - index - 1],
          size: 'small',
          presenceBorderColor: 'red',
        })
      );
    });

    it('should render <Avatar/> avatar.length times when the number of avatars is less than the max', () => {
      const element = shallow(<AvatarStack max={3} avatars={[{}, {}]} />);
      expect(element.find(Avatar)).to.have.length(2);
    });

    it('should render <Avatar/> max times when the number of avatars equals the max', () => {
      const element = shallow(<AvatarStack max={3} avatars={[{}, {}, {}]} />);
      expect(element.find(Avatar)).to.have.length(3);
    });

    it('should render <Avatar/> max-1 times when the number of avatars exceeds the max', () => {
      const element = shallow(<AvatarStack max={3} avatars={[{}, {}, {}, {}]} />);
      expect(element.find(Avatar)).to.have.length(2);
    });

    it('should not render <MoreAvatar/> when the number of avatars is less than the max', () => {
      const element = shallow(<AvatarStack max={3} avatars={[{}, {}]} />);
      expect(element.find(MoreAvatar)).to.have.length(0);
    });

    it('should not render <MoreAvatar/> when the number of avatars equals the max', () => {
      const element = shallow(<AvatarStack max={3} avatars={[{}, {}, {}]} />);
      expect(element.find(MoreAvatar)).to.have.length(0);
    });

    it('should render <MoreAvatar/> when the number of avatars exceeds the max', () => {
      const element = shallow(<AvatarStack max={3} avatars={[{}, {}, {}, {}]} />);
      expect(element.find(MoreAvatar)).to.have.length(1);
    });

    it('should render the number of avatars not rendered when the number of avatars exceeds the max', () => {
      const element1 = shallow(<AvatarStack max={3} avatars={[{}, {}, {}, {}]} />);
      expect(element1.find(MoreAvatar).first().prop('children')).to.include(2);

      const element2 = shallow(<AvatarStack max={3} avatars={[{}, {}, {}, {}, {}]} />);
      expect(element2.find(MoreAvatar).first().prop('children')).to.include(3);
    });

    it('should render the first max avatars in reverse order', () => {
      const element1 = shallow(<AvatarStack max={3} avatars={[{ src: '1' }, { src: '2' }, { src: '3' }, { src: '4' }]} />);
      const avatars = element1.find(Avatar);
      expect(avatars.at(0).prop('src')).to.equal('2');
      expect(avatars.at(1).prop('src')).to.equal('1');
    });
  });
});
