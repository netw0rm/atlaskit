import { vdom, define } from 'skatejs';
import Theme, { Prop } from 'ak-theme';

export default define('ak-button-adg2', {
  render() {
    return (
      <Theme id="ak-button-adg2">
        <Prop name="button.padding" value="4px 10px" />
        <Prop name="button.border" value="1px solid #ccc" />
        <Prop name="button.transition" value="none" />
        <Prop name="button.standard.background" value="#f5f5f5" />
        <Prop name="button.standard.color" value="#333" />
        <Prop name="button.standard.hover.background" value="#e9e9e9" />
        <Prop name="button.standard.hover.borderColor" value="#999" />
        <Prop name="button.standard.active.boxShadow" value="inset 0 3px 6px 0 rgba(0,0,0,.1)" />
        <Prop name="button.standard.active.background" value="#f5f5f5" />
        <Prop name="button.primary.background" value="#3572b0" />
        <Prop name="button.primary.borderColor" value="transparent" />
        <Prop name="button.primary.color" value="#fff" />
        <Prop name="button.primary.fontWeight" value="700" />
        <Prop name="button.primary.hover.background" value="#2a67a5" />
        <Prop name="button.primary.hover.borderColor" value="transparent" />
        <Prop name="button.primary.active.background" value="#3572b0" />
        <Prop name="button.subtle.color" value="#707070" />
        <Prop name="button.subtle.borderColor" value="transparent" />
        <Prop name="button.subtle.hover.color" value="#000" />
        <Prop name="button.disabled.color" value="#999" />
        <Prop name="button.disabled.background" value="#f5f5f5" />
        <Prop name="button.disabled.boxShadow" value="none" />
        <Prop name="button.selected.boxShadow" value="inset 0 3px 6px 0 rgba(0,0,0,.1)" />
        <Prop name="button.selected.background" value="#f5f5f5" />
        <Prop name="button.selected.color" value="#333" />
        <Prop name="button.selected.hover.background" value="#f5f5f5" />
        <Prop name="button.selected.hover.borderColor" value="#ccc" />
        <Prop name="button.link.color" value="#3572b0" />
        <Prop name="button.link.borderColor" value="transparent" />
        <Prop name="button.link.boxShadow" value="none" />
        <Prop name="button.link.hover.borderColor" value="transparent" />
        <Prop name="button.link.active.boxShadow" value="none" />
      </Theme>
    );
  },
});
