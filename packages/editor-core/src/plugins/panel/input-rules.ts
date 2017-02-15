import { analyticsService } from '../../analytics';
import { commands, InputRule, ProseMirror } from '../../prosemirror';

const panelTypes = ['info', 'note', 'tip', 'warning'];

export default panelTypes.map((panelType) => {
  return new InputRule(new RegExp(`^{${panelType}}$`), '', (
    pm: ProseMirror,
    match: string[],
    to: number
  ) : boolean => {

    analyticsService.trackEvent(`atlassian.editor.format.${panelType}.autoformatting`);

    pm.tr.delete(to - (panelType.length + 2), to).apply();
    const { nodes } = pm.schema;
    if (nodes.panel) {
      commands.wrapIn(nodes.panel, { panelType })(pm);
    }
    return true;
  });
});
