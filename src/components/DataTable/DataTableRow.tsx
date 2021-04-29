import { IRow } from './Types'

const DataTableRow = (props: { data: IRow }): JSX.Element => {
  // TODO: Just build UI
  return <div>{JSON.stringify(props.data)}</div>
}

export default DataTableRow
