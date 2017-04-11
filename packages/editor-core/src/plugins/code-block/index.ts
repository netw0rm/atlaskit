import {
    EditorState,
    EditorView,
    Node,
    Plugin,
    PluginKey,
    NodeViewDesc,
} from '../../prosemirror';
import * as commands from '../../commands';

export type CodeBlockStateSubscriber = (state: CodeBlockState) => any;
export type StateChangeHandler = (state: CodeBlockState) => any;

export class CodeBlockState {
    element?: HTMLElement;
    language: string | undefined;
    supportedLanguages: string[];
    toolbarVisible: boolean = false;
    domEvent: boolean = false;

    private state: EditorState<any>;
    private changeHandlers: CodeBlockStateSubscriber[] = [];
    private activeCodeBlock?: Node;
    private editorFocused: boolean = false;

    constructor(state: EditorState<any>) {
        this.changeHandlers = [];
        this.state = state;
    }

    subscribe(cb: CodeBlockStateSubscriber) {
        this.changeHandlers.push(cb);
        cb(this);
    }

    unsubscribe(cb: CodeBlockStateSubscriber) {
        this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
    }

    updateLanguage(language: string | undefined, view: EditorView): void {
        if (this.activeCodeBlock) {
            commands.setBlockType(view.state.schema.nodes.codeBlock, { language })(view.state, view.dispatch);
        }
    }

    updateEditorFocused(editorFocused: boolean) {
        this.editorFocused = editorFocused;
    }

    setLanguages(supportedLanguages: string[]) {
        this.supportedLanguages = supportedLanguages;
    }

    update(state: EditorState<any>, docView: NodeViewDesc, domEvent: boolean = false) {
        this.state = state;
        const codeBlockNode = this.activeCodeBlockNode();

        if (domEvent && codeBlockNode || codeBlockNode !== this.activeCodeBlock) {
            this.domEvent = domEvent;
            const newElement = codeBlockNode && this.activeCodeBlockElement(docView);

            this.toolbarVisible = this.editorFocused && !!codeBlockNode && (domEvent || this.element !== newElement);
            this.activeCodeBlock = codeBlockNode;
            this.language = codeBlockNode && codeBlockNode.attrs['language'] || undefined;
            this.element = newElement;
            this.triggerOnChange();
        }
    }

    private triggerOnChange() {
        this.changeHandlers.forEach(cb => cb(this));
    }

    private activeCodeBlockElement(docView: NodeViewDesc): HTMLElement {
        const offset = this.nodeStartPos();
        const { node } = docView.domFromPos(offset, 1);

        return node as HTMLElement;
    }

    private nodeStartPos(): number {
        const { $from } = this.state.selection;
        return $from.start($from.depth);
    }

    private activeCodeBlockNode(): Node | undefined {
        const { state } = this;
        const { $from } = state.selection;
        const node = $from.parent;
        if (node.type === state.schema.nodes.codeBlock) {
            return node;
        }

        return undefined;
    }
}
export const stateKey = new PluginKey('codeBlockPlugin');


const plugin = new Plugin({
    state: {
        init(config, state: EditorState<any>) {
            return new CodeBlockState(state);
        },
        apply(tr, pluginState: CodeBlockState, oldState, newState) {
            const stored = tr.getMeta(stateKey);
            if (stored) {
                pluginState.update(newState, stored.docView, stored.domEvent);
            }
            return pluginState;
        }
    },
    key: stateKey,
    view: (editorView: EditorView) => {
        stateKey.getState(editorView.state).update(editorView.state, editorView.docView);
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
    }
});

export default plugin;
