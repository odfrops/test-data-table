import DataTableRowGroup from './DataTableRowGroup'
import { IRow } from './Types'

const DataTableBody = (props: {
  data: IRow[][]
  groupSize: number
}): JSX.Element => {
  return (
    <div>
      {props.data.map((rowGroup, idx) => {
        return (
          <DataTableRowGroup
            key={idx}
            {...{ data: rowGroup, groupSize: props.groupSize }}
          ></DataTableRowGroup>
        )
      })}
    </div>
  )
}

export default DataTableBody
