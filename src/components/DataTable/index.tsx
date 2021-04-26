import React from 'react'
import * as Types from './DataTableOptions'

const DataTable: React.FC<Types.IOptions> = (options): JSX.Element => {

  console.log(options)

  return (
    <div>Hey, mock table</div>
  )
}

export default DataTable
export * from './DataTableOptions'