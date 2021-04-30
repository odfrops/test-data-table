import { useState } from 'react'
import DataTableHeaderPopup from './DataTableHeaderPopup'
import { IColumn, SortDirection } from './Types'
import { DataTableHeaderStyle } from './Styles'

const DataTableHeader = (props: {
  columns: (IColumn | string)[]
  onSort: (column: string) => void
  onFilter: (column: string, value: string) => void
  filters: { [key: string]: string }
  sortColumns: {
    [key: string]: SortDirection
  }
}): JSX.Element => {
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
    <thead>
      <tr>
        {props.columns.map((column, idx) => {
          if (typeof column === 'string') {
            return (
              <th key={idx} style={DataTableHeaderStyle}>
                {column}
              </th>
            )
          } else {
            const sortable = column.sortable === true
            const filterable = column.filterable === true
            return (
              <th key={idx} style={DataTableHeaderStyle}>
                <div
                  onClick={() => onPopup(idx, !popups[idx])}
                  style={{ cursor: 'pointer' }}
                >
                  {column.name}
                </div>
                {popups[idx] && (
                  <DataTableHeaderPopup
                    key={idx}
                    {...{
                      filterable,
                      filter: props.filters[column.name],
                      sortable,
                      sort: props.sortColumns[column.name],
                      onFilter: (value) => props.onFilter(column.name, value),
                      onSort: () => props.onSort(column.name),
                    }}
                  ></DataTableHeaderPopup>
                )}
              </th>
            )
          }
        })}
      </tr>
    </thead>
  )
}

export default DataTableHeader
