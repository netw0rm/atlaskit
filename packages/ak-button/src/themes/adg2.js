import { vdom, define } from 'skatejs';
import Theme, { Prop } from 'ak-theme';
import { em, grid } from '../shared-variables';

export default define('ak-button-theme-adg2', {
  render() {
    const lineHeight = `${((grid * 4) - 2) / em}em`;
    const compactLineHeight = `${((grid * 3) - 2) / em}em`;
    return (
      <Theme id="ak-button-theme-adg2">
        <Prop name="button.border" value="1px solid #ccc" />
        <Prop name="button.lineHeight" value={lineHeight} />
        <Prop name="button.transition" value="none" />
        <Prop name="standard.background" value="#f5f5f5" />
        <Prop name="standard.color" value="#333" />
        <Prop name="standard.hover.background" value="#e9e9e9" />
        <Prop name="standard.hover.borderColor" value="#999" />
        <Prop name="standard.active.boxShadow" value="inset 0 3px 6px 0 rgba(0,0,0,.1)" />
        <Prop name="standard.active.background" value="#f5f5f5" />
        <Prop name="primary.background" value="#3572b0" />
        <Prop name="primary.borderColor" value="transparent" />
        <Prop name="primary.color" value="#fff" />
        <Prop name="primary.fontWeight" value="700" />
        <Prop name="primary.hover.background" value="#2a67a5" />
        <Prop name="primary.hover.borderColor" value="transparent" />
        <Prop name="primary.active.background" value="#3572b0" />
        <Prop name="subtle.color" value="#707070" />
        <Prop name="subtle.borderColor" value="transparent" />
        <Prop name="subtle.hover.color" value="#000" />
        <Prop name="disabled.color" value="#999" />
        <Prop name="disabled.background" value="#f5f5f5" />
        <Prop name="disabled.boxShadow" value="none" />
        <Prop name="selected.boxShadow" value="inset 0 3px 6px 0 rgba(0,0,0,.1)" />
        <Prop name="selected.background" value="#f5f5f5" />
        <Prop name="selected.color" value="#333" />
        <Prop name="selected.hover.background" value="#f5f5f5" />
        <Prop name="selected.hover.borderColor" value="#ccc" />
        <Prop name="link.color" value="#3572b0" />
        <Prop name="link.borderColor" value="transparent" />
        <Prop name="link.boxShadow" value="none" />
        <Prop name="link.hover.borderColor" value="transparent" />
        <Prop name="link.active.boxShadow" value="none" />
        <Prop name="compact.lineHeight" value={compactLineHeight} />
      </Theme>
    );
  },
});
