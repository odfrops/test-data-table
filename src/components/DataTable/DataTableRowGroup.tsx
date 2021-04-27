import { IRow } from './DataTableOptions'

const DataTableRowGroup = (data: IRow[]): JSX.Element => {
  return <div>{JSON.stringify(data)}</div>
}

export default DataTableRowGroup
