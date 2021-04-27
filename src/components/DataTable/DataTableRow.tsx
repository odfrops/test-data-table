import { IRow } from './DataTableOptions'

const DataTableRow = (data: IRow): JSX.Element => {
  return <div>{JSON.stringify(data)}</div>
}

export default DataTableRow
