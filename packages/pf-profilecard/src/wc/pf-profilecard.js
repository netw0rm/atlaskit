import { emit, vdom, define, prop } from 'skatejs';
import { enumeration } from 'akutil-common';
import AkAvatar from 'ak-avatar';
import AkButton from 'ak-button';

import 'style!../host.less';
import IconLabel from './IconLabel';
import events from '../internal/events';
import { getTimeLabel } from '../util/datetime';
import shadowStyles from './pf-profilecard-shadow.less';


const styles = shadowStyles.locals;

const PRESENCE_ATTRIBUTE_ENUM = {
  attribute: 'presence',
  values: ['none', 'online', 'busy', 'offline'],
  missingDefault: 'none',
  invalidDefault: 'offline',
};

const PRESENCE_STRINGS = {
  online: 'Available',
  busy: 'Unavailable',
  offline: 'Offline',
};

/**
 * @description Definition of the Profilecard component.
 * @class Profilecard
 * @example @html <pf-profilecard></pf-profilecard>
 * @example @js import Profilecard from 'pf-profilecard';
 * const myProfilecard = new Profilecard();
 *
 */
export default define('pf-profilecard', {
  render(elem) {
    const labelTime = getTimeLabel(elem.timestamp, elem.use24h);
    const actions = (elem.actions || []).map(action => (
      <AkButton
        appearance="link"
        compact
        onclick={() => emit(elem, events.action, {
          detail: {
            action: action.event,
          },
        })}
      >{action.label}</AkButton>
    ));

    return (
      <div>
        <style>{shadowStyles.toString()}</style>
        <div className={styles.pfProfilecard}>
          <AkAvatar size="xlarge" src={elem.avatarUrl} className={styles.pfCardAvatar} />
          <div className={styles.pfCardRight}>
            <span className={styles.pfCardFullname}>{elem.fullname}</span>
            <span className={styles.pfCardMeta}>{elem.meta}</span>
            {
              elem.presence !== 'none' ? <IconLabel
                className={styles.pfCardPresence}
                icon={elem.presence}
                label={PRESENCE_STRINGS[elem.presence]}
              /> : null
            }
            {elem.nickname ? <IconLabel icon="mention" label={`@${elem.nickname}`} /> : null}
            {elem.location ? <IconLabel icon="location" label={elem.location} /> : null}
            {labelTime ? <IconLabel icon="time" label={labelTime} /> : null}
            <div className={styles.pfCardFlexSpacer} />
            <div className={styles.pfCardActions}>
              {actions}
            </div>
          </div>
        </div>
      </div>
    );
  },

  props: {
    /**
     * @memberof Profilecard
     * @instance
     * @type {string}
     */
    avatarUrl: prop.string({ attribute: true }),

    /**
     * @memberof Profilecard
     * @instance
     * @type {string}
     */
    fullname: prop.string({ attribute: true }),

    /**
     * @memberof Profilecard
     * @instance
     * @type {string}
     */
    meta: prop.string({ attribute: true }),

    /**
     * @memberof Profilecard
     * @instance
     * @type {string}
     */
    nickname: prop.string({ attribute: true }),

    /**
     * @memberof Profilecard
     * @instance
     * @type {number}
     */
    timestamp: prop.number({ attribute: true }),

    /**
     * @memberof Profilecard
     * @instance
     * @type {string}
     */
    location: prop.string({ attribute: true }),

    /**
     * @memberof Profilecard
     * @instance
     * @type {string}
     */
    presence: enumeration(PRESENCE_ATTRIBUTE_ENUM)({ attribute: true }),

    /**
     * @description Defining the action buttons on the card.
     * Array of one or more action objects with `label` and `event` keys.
     * `label` defines the button text while `event` is returned as detail in
     * the emitted `action` event in case the button is clicked.
     * @memberof Profilecard
     * @instance
     * @type {array}
     * @example [{label: 'Chat', event: 'ev_chat'}, {label: 'View', event: 'ev_view'}]
     */
    actions: prop.array({ attribute: true }),

    /**
     * @description Use 24h clock instead of the default 12h clock.
     * @memberof Profilecard
     * @instance
     * @type {boolean}
     */
    use24h: prop.boolean({ attribute: true }),
  },
});
