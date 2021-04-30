import CSS from 'csstype'
import { DataTableRowStyle } from './Styles'
import { IRow } from './Types'

const DataTableRow = (props: {
  data: IRow
  rowStyle?: CSS.Properties
  rowIndex: number
  expand: () => void
}): JSX.Element => {
  const cells = []
  for (const key in props.data) {
    if (Object.prototype.hasOwnProperty.call(props.data, key)) {
      const cell = props.data[key]
      cells.push(
        <td style={{ padding: '8px' }} key={key}>
          {cell}
        </td>
      )
    }
  }
  return (
    <tr
      data-testid={`row_${props.rowIndex}`}
      onClick={() => props.expand()}
      style={{ ...DataTableRowStyle, ...props.rowStyle }}
    >
      {cells}
    </tr>
  )
}

export default DataTableRow
