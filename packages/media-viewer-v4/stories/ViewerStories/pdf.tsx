import * as React from 'react';
import {Main} from '../../src/components/main';
import {PDFView} from '../../src/components/viewers/pdf';
const url = 'http://127.0.0.1:8080/example.pdf';

export function pdf() {
  return(
    <Main>
      <PDFView url={url}/>
    </Main>
  );
}
