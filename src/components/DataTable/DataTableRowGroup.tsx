import DataTableRow from './DataTableRow'
import { IRow } from './Types'

const DataTableRowGroup = (props: {
  data: IRow[]
  groupSize: number
}): JSX.Element => {
  // Add expand/collapse of expanded event at first row (if groupSize > data.length)
  return (
    <div>
      {props.data.map((row, idx) => {
        return <DataTableRow key={idx} {...{ data: row }}></DataTableRow>
      })}
    </div>
  )
}

export default DataTableRowGroup
