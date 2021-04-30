import CSS from 'csstype'
import { DataTableRowStyle } from './Styles'
import { IRow } from './Types'

const DataTableRow = (props: {
  data: IRow
  rowStyle?: CSS.Properties
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
  const styles =
    props.rowStyle !== undefined
      ? { ...DataTableRowStyle, ...props.rowStyle }
      : DataTableRowStyle
  return (
    <tr
      data-testid="row"
      onClick={() => props.expand()}
      style={{
        ...styles,
      }}
    >
      {cells}
    </tr>
  )
}

export default DataTableRow
