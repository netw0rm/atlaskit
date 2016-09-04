import { storiesOf } from '@kadira/storybook';
import { Doc, Table, TableCell } from '../src';
import { ProseMirror, Schema, Text } from 'ak-editor-prosemirror';
import { Component } from 'react';

storiesOf('ak-editor-plugin-tables', module)
  .add('Basic', () => {
    class Demo extends Component<{}, {}> {
      componentDidMount() {
        let place = (this.refs as any).root as HTMLElement;
        let schema = new Schema({
          nodes: {
            doc: {type: Doc, content: "block+"},
            table: { type: Table, content: "table_cell*", group: 'block' },
            table_cell: { type: TableCell, content: 'inline' },
            text: {type: Text, group: "inline"},
          },
          marks: {},
        });

        new ProseMirror({
          place: place,
          doc: schema.node('doc', {}, [
            schema.node('table', { rows: '[1,2,3,4,5]', cols: '[1,2,3,4,5,6,7,8,9,10]' }, [
              schema.node('table_cell', { row: '1', col: '1' }, schema.text('cell1')),
              schema.node('table_cell', { row: '1', col: '2' }, schema.text('cell2')),
              schema.node('table_cell', { row: '5', col: '10' }, schema.text('cell2')),
            ]),
          ]),
          schema: schema,
        });
      }

      render() {
        return (
          <div ref="root"></div>
        );
      }
    }

    return <Demo />;
  });
