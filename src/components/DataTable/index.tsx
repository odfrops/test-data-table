import * as Types from './DataTableOptions'

const DataTable: React.FC<Types.IConfig> = (config): JSX.Element => {
  let dropdown: Types.SortDirection = 'ASC'

  dropdown = 'DESC'

  console.log(dropdown)
  console.log(config)

  return <div>Hey, mock table</div>
}

export default DataTable
export * from './DataTableOptions'
