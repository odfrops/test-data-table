import { useState } from 'react'
import DataTableHeaderPopup from './DataTableHeaderPopup'
import { IColumn, SortDirection } from './Types'

const DataTableHeader = (props: {
  columns: (IColumn | string)[]
  onSort: (column: string) => void
  onFilter: (column: string, value: string) => void
  filters: { [key: string]: string }
  sortColumns: {
    [key: string]: SortDirection
  }
}): JSX.Element => {
  // Just build UI
  const [popups, togglePopup] = useState<boolean[]>(() => {
    return Array(props.columns.length).fill(false)
  })

  const onPopup = (idx: number, toggle: boolean) => {
    const newPopups = popups.slice()
    newPopups.fill(false)
    newPopups[idx] = toggle
    togglePopup(newPopups)
  }
  return (
    <div>
      {props.columns.map((column, idx) => {
        if (typeof column === 'string') {
          return <div>{column}</div>
        } else {
          const sortable = column.sortable === true
          const filterable = column.filterable === true
          return (
            <DataTableHeaderPopup
              key={idx}
              {...{
                filterable,
                filter: props.filters[column.name],
                sortable,
                sort: props.sortColumns[column.name],
                popup: popups[idx],
                togglePopup: (toggle) => onPopup(idx, toggle),
                onFilter: (value) => props.onFilter(column.name, value),
                onSort: () => props.onSort(column.name),
              }}
            ></DataTableHeaderPopup>
          )
        }
      })}
    </div>
  )
}

export default DataTableHeader
