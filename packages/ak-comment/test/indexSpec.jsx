import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';
import Avatar from 'ak-avatar';
import Button from 'ak-button';
import Lozenge from 'ak-lozenge';

import Comment from '../src/';
import styles from '../src/styles.less';
import { name } from '../package.json';

const { expect } = chai;
chai.use(chaiEnzyme());

describe(name, () => {
  describe('Comment', () => {
    describe('exports', () => {
      it('the Comment component', () => {
        expect(Comment).to.exist;
        expect(new Comment()).to.be.instanceOf(Component);
      });
    });

    describe('construction', () => {
      it('should be able to create a component', () => {
        const wrapper = shallow(<Comment />);
        expect(wrapper).to.exist;
        expect(wrapper.instance()).to.be.instanceOf(Component);
      });
    });

    describe('props', () => {
      describe('actions prop', () => {
        const actions = [
          { content: 'string content' },
          { content: (<p>JSX content</p>) },
          { content: 'string content with onClick', onClick: () => {} },
          { content: (<p>JSX content with onClick</p>), onClick: () => {} },
        ];
        let wrapper;

        beforeEach(() => {
          wrapper = mount(<Comment actions={actions} />);
        });

        it('should render each action item in the correct container', () => {
          const container = wrapper.find(`.${styles.locals.actionsContainer}`);
          expect(container).to.have.exactly(actions.length).descendants(Button);

          const items = container.find(Button);
          items.forEach((item, index) => {
            if (typeof actions[index].content === 'string') {
              expect(item).to.contain.text(actions[index].content);
            } else {
              expect(item).to.contain(actions[index].content);
            }

            if (actions[index].onClick) {
              expect(item).to.have.prop('onClick', actions[index].onClick);
            }
          });
        });
      });

      describe('author prop', () => {
        it('should render the author in the correct container', () => {
          const author = 'Joshua Nelson';
          const wrapper = mount(<Comment author={author} />);
          expect(wrapper.find(`.${styles.locals.topContainer}`)
            .containsMatchingElement(<div className={styles.locals.topItem}>{author}</div>)
          ).to.equal(true);
        });
      });

      describe('avatar prop', () => {
        it('should render the provided Avatar', () => {
          const avatar = <Avatar src="" />;
          const wrapper = mount(<Comment avatar={avatar} />);
          expect(wrapper).to.contain(avatar);
        });
      });

      describe('content prop', () => {
        it('should render the provided content in the correct container', () => {
          const content = (<p>My sample content</p>);
          const wrapper = mount(<Comment content={content} />);
          expect(wrapper.find(`.${styles.locals.contentContainer}`)).to.contain(content);
        });

        it('can render string content', () => {
          const textContent = 'My sample content';
          const wrapper = mount(<Comment content={textContent} />);
          expect(wrapper.find(`.${styles.locals.contentContainer}`)).to.have.text(textContent);
        });
      });

      describe('datetime prop', () => {
        it('should render the datetime in the correct container', () => {
          const datetime = '30 August, 2016';
          const wrapper = mount(<Comment datetime={datetime} />);
          expect(wrapper.find(`.${styles.locals.topContainer}`)
            .containsMatchingElement(<div className={styles.locals.topItem}>{datetime}</div>)
          ).to.equal(true);
        });
      });

      describe('type prop', () => {
        it('should render a Lozenge with the type in the correct container', () => {
          const type = 'type';
          const wrapper = mount(<Comment type={type} />);
          expect(wrapper.find(`.${styles.locals.topContainer}`)
            .containsMatchingElement(
              <div className={styles.locals.topItem}>
                <Lozenge>{type}</Lozenge>
              </div>)
          ).to.equal(true);
        });
      });
    });
  });
});
