import * as React from 'react';

export default ({name, macroId, macroBodyHtml, placeholderUrl}) => {
  if (macroBodyHtml) {
    return <span dangerouslySetInnerHTML={{__html: macroBodyHtml}} />;
  }

  if (placeholderUrl) {
    return <img src={placeholderUrl} />;
  }

  return <span>Macro placeholder ({name} - {macroId})</span>;
};
