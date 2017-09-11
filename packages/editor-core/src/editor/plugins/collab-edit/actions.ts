import {
  Step,
  EditorView,
  EditorState,
} from '../../../prosemirror';

export const handleInit = (data: { doc?: any, json?: any }, view: EditorView) => {
  const { doc, json } = data;
  if (doc) {
    const { state, state: { schema, tr } } = view;
    const content = (doc.content || []).map(child => schema.nodeFromJSON(child));

    if (content.length) {
      const newState = state.apply(
        tr
          .setMeta('addToHistory', false)
          .replaceWith(0, state.doc.nodeSize - 2, content)
          .scrollIntoView()
      );
      view.updateState(newState);
    }
  } else if (json) {
    applyRemoteSteps(json, view);
  }
};

export const handleConnection = (data: { sid: string }, view: EditorView) => {
  const { state: { tr } } = view;
  view.dispatch(tr.setMeta('sessionId', data));
};

export const handlePresence = (data: any, view: EditorView) => {
  const { state: { tr } } = view;
  view.dispatch(tr.setMeta('presence', data));
};

export const applyRemoteData = (data: { json?: any, newState?: EditorState<any> }, view: EditorView) => {
  const { json, newState } = data;
  if (json) {
    applyRemoteSteps(json, view);
  } else if (newState) {
    view.updateState(newState);
  }
};

export const applyRemoteSteps = (json: any[], view: EditorView) => {
  const { state, state: { schema } } = view;
  let { tr } = state;

  json.forEach(stepJson => {
    const step = Step.fromJSON(schema, stepJson);
    tr.step(step);
  });

  tr.setMeta('addToHistory', false);
  tr.scrollIntoView();
  const newState = state.apply(tr);
  view.updateState(newState);
};

export const handleTelePointer = (data: any, view: EditorView) => {
  const { state: { tr } } = view;
  view.dispatch(
    tr
      .setMeta('telepointer', data)
      .scrollIntoView()
  );
};

export const getSendableSelection = (oldState: EditorState<any>, newState: EditorState<any>) => {
  const oldSelection = oldState.selection;
  const newSelection = newState.selection;

  if (oldSelection.anchor !== newSelection.anchor ||oldSelection.head !== newSelection.head) {
    return {
      type: 'textSelection',
      anchor: newSelection.anchor,
      head: newSelection.head
    };
  }
};
