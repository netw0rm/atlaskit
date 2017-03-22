import { analyticsService } from '../../analytics';
import {
    EditorState,
    PluginKey,
    EditorView,
    NodeViewDesc,
    TextSelection,
    Plugin,
    Node,
} from '../../prosemirror';
import inputRulePlugin from './input-rules';
import { reconfigure } from '../utils';
import keymapPlugin from './keymaps';

export interface PanelType {
    panelType: 'info' | 'note' | 'tip' | 'warning';
}

export const availablePanelType = [
    { panelType: 'info' },
    { panelType: 'note' },
    { panelType: 'tip' },
    { panelType: 'warning' }
];

export class PanelState {
    private state: EditorState<any>;
    private editorFocused: boolean = false;
    private activeNode: Node | undefined;
    private changeHandlers: PanelStateSubscriber[] = [];

    element?: HTMLElement | undefined;
    activePanelType?: string | undefined;
    toolbarVisible?: boolean | undefined;

    constructor(state: EditorState<any>) {
        this.changeHandlers = [];
        this.state = state;
    }

    updateEditorFocused(editorFocused: boolean) {
        this.editorFocused = editorFocused;
    }

    changePanelType(view: EditorView, panelType: PanelType) {
        analyticsService.trackEvent(`atlassian.editor.format.${panelType}.button`);
        const { state, dispatch } = view;
        let { tr } = state;
        // wrap selection in new panel type
        const { panel } = state.schema.nodes;
        const { $from, $to } = state.selection;
        let range = $from.blockRange($to)!;
        tr = tr.wrap(range, [{ type: panel, attrs: panelType }]);
        // list selection
        tr.setSelection(state.selection.map(tr.doc, tr.mapping));
        let blockStart = tr.doc.resolve($from.start($from.depth - 1));
        let blockEnd = tr.doc.resolve($to.end($to.depth - 1));
        range = blockStart.blockRange(blockEnd)!;
        tr.lift(range, blockStart.depth - 1);
        dispatch(tr);
    }

    removePanelType(view: EditorView) {
        const { dispatch, state } = view;
        const { tr } = state;
        const { $from, $to } = state.selection;
        const range = $from.blockRange($to)!;
        dispatch(tr.lift(range, $from.depth - 2));
    }

    subscribe(cb: PanelStateSubscriber) {
        this.changeHandlers.push(cb);
        cb(this);
    }

    unsubscribe(cb: PanelStateSubscriber) {
        this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
    }

    update(state: EditorState<any>, docView: NodeViewDesc, domEvent: boolean = false) {
        this.state = state;
        const newPanel = this.getActivePanel(docView);
        if ((domEvent && newPanel) || this.activeNode !== newPanel) {
            const newElement = newPanel && this.getDomElement(docView);
            this.activeNode = newPanel;
            this.toolbarVisible = this.editorFocused && !!newPanel && (domEvent || this.element !== newElement);
            this.element = newElement;
            this.activePanelType = newPanel && newPanel.attrs['panelType'];
            this.changeHandlers.forEach(cb => cb(this));
        }
    }

    private getActivePanel(docView: NodeViewDesc): Node | undefined {
        const { state } = this;
        if (state.selection instanceof TextSelection) {
            const { $from } = state.selection;
            const node = $from.node($from.depth - 1);
            if (node.type === state.schema.nodes.panel) {
                return node;
            }
        }
    }

    private getDomElement(docView: NodeViewDesc): HTMLElement | undefined {
        const { state: { selection } } = this;
        if (selection instanceof TextSelection) {
            const { node } = docView.domFromPos(selection.$from.pos);
            let currentNode = node;
            while (currentNode) {
                if (currentNode.attributes && currentNode.attributes['data-panel-type']) {
                    return currentNode as HTMLElement;
                }
                currentNode = currentNode.parentNode!;
            }
        }
    }

}

export type PanelStateSubscriber = (state: PanelState) => any;

export const stateKey = new PluginKey('panelPlugin');

const plugin = new Plugin({
    state: {
        init(config, state: EditorState<any>) {
            return new PanelState(state);
        },
        apply(tr, pluginState: PanelState, oldState, newState) {
            const stored = tr.getMeta(stateKey);
            if (stored) {
                pluginState.update(newState, stored.docView, stored.domEvent);
            }
            return pluginState;
        }
    },
    key: stateKey,
    view: (view: EditorView) => {
        reconfigure(view, [keymapPlugin(view), inputRulePlugin(view.state.schema)]);
        return {
            update: (view: EditorView, prevState: EditorState<any>) => {
                stateKey.getState(view.state).update(view.state, view.docView);
            }
        };
    },
    props: {
        handleClick(view: EditorView, event) {
            view.dispatch(view.state.tr.setMeta(stateKey, { docView: view.docView, domEvent: true }));
            return false;
        },
        onFocus(view: EditorView, event) {
            stateKey.getState(view.state).updateEditorFocused(true);
        },
        onBlur(view: EditorView, event) {
            stateKey.getState(view.state).updateEditorFocused(false);
            view.dispatch(view.state.tr.setMeta(stateKey, { docView: view.docView, domEvent: true }));
        },
    },
});

export default plugin;
