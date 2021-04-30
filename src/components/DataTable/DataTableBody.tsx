import DataTableRowGroup from './DataTableRowGroup'
import { IRow } from './Types'

const DataTableBody = (props: {
  data: IRow[][]
  groupSize: number
}): JSX.Element => {
  return (
    <tbody data-testid="body">
      {props.data.map((rowGroup, idx) => {
        return (
          <DataTableRowGroup
            key={idx}
            {...{ data: rowGroup, groupSize: props.groupSize }}
          ></DataTableRowGroup>
        )
      })}
    </tbody>
  )
}

export default DataTableBody
