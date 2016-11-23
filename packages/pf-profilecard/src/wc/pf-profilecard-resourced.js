/** @jsx vdom */
import { emit, vdom, define, prop, props } from 'skatejs';

import 'style!../host.less';
import ProfileCard from './pf-profilecard';
import ProfileSpinner from './pf-spinner';
import WarningIcon from './WarningIcon';
import { getTimestampWithOffset } from '../util/datetime';
import events from '../internal/events';
import {
  data,
  loading,
  failed,
  fnRequest,
  fnResolve,
  fnReject,
} from '../internal/symbols';
import shadowStyles from './pf-profilecard-resourced-shadow.less';


const styles = shadowStyles.locals;

/**
 * @description Create instances of the component programmatically, or using markup.
 * @class ProfilecardResourced
 * @example @html <pf-profilecard-resourced/></pf-profilecard-resourced>
 * @example @js import ProfilecardResourced from 'pf-profilecard';
 * const component = new ProfilecardResourced();
 */
export default define('pf-profilecard-resourced', {
  prototype: {
    [data]: {},

    [fnRequest]() {
      props(this, {
        [loading]: true,
        [failed]: false,
      });
      const options = {
        cloudId: this['data-cloud-id'],
        accountId: this['data-account-id'],
        expand: true,
      };
      this.resourceProvider._get(options)
      .then(
        res => this[fnResolve](res),
        err => this[fnReject](err)
      );
    },

    [fnResolve](res) {
      this[data] = res;
      props(this, {
        [loading]: false,
        [failed]: false,
      });

      emit(this, events.success);
    },

    [fnReject](err) {
      props(this, {
        [loading]: false,
        [failed]: true,
      });

      emit(this, events.error, {
        detail: err,
      });
    },
  },

  updated(elem, prevProps = {}) {
    // Immediately show failed card if no account-id is given
    if (!elem['data-account-id']) {
      props(elem, {
        [loading]: false,
        [failed]: true,
      });
    }

    // check for `data-account-id` attribute changes to load new data
    if (prevProps['data-account-id'] !== elem['data-account-id']) {
      elem[fnRequest]();
    }

    return true;
  },

  render(elem) {
    if (elem[loading]) {
      return (
        <div>
          <style>{shadowStyles.toString()}</style>
          <div className={styles.pfProfilecardResourced}>
            <div className={styles.pfSpinnerContainer}>
              <ProfileSpinner />
            </div>
          </div>
        </div>
      );
    } else if (elem[failed]) {
      return (
        <div>
          <style>{shadowStyles.toString()}</style>
          <div className={styles.pfProfilecardResourced}>
            <div className={styles.pfCardRequestError}>
              <p>
                <WarningIcon />
                <br />
                Something went wrong
                <br />
                <span>We couldn&#39;t get this person&#39;s profile.</span>
              </p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <ProfileCard
        {...elem[data]}
        timestamp={getTimestampWithOffset(elem[data].utcOffset)}
        meta={elem[data].role}
        use24h={elem.use24h}
        actions={elem.actions}
      />
    );
  },

  props: {
    resourceProvider: {},

    /**
     * @memberof ProfilecardResourced
     * @instance
     * @type {string}
     */
    'data-account-id': prop.string({
      attribute: true,
      default: () => null,
    }),

    /**
     * @memberof ProfilecardResourced
     * @instance
     * @type {string}
     */
    'data-cloud-id': prop.string({
      attribute: true,
      default: () => null,
    }),

    /**
     * @description Defining the action buttons on the card.
     * Array of one or more action objects with `label` and `event` keys.
     * `label` defines the button text while `event` is returned as detail in
     * the emitted `action` event in case the button is clicked.
     * [Will be passed to ProfileCard]
     * @memberof ProfilecardResourced
     * @instance
     * @type {array}
     * @example [{label: 'Chat', event: 'ev_chat'}, {label: 'View', event: 'ev_view'}]
     */
    actions: prop.array({
      attribute: true,
    }),

    /**
     * @description Use 24h clock instead of the default 12h clock.
     * [Will be passed to ProfileCard]
     * @memberof ProfilecardResourced
     * @instance
     * @type {boolean}
     */
    use24h: prop.boolean({
      attribute: true,
    }),

    [loading]: prop.boolean({
      initial: false,
    }),
    [failed]: prop.boolean({
      initial: false,
    }),
  },
});
