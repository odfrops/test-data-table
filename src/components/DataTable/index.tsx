import { useEffect, useState } from 'react'
import { DEFAULT_GROUP_SIZE, DEFAULT_PAGE_SIZE } from './Constants'
import DataTableBody from './DataTableBody'
import DataTableFooter from './DataTableFooter'
import DataTableHeader from './DataTableHeader'
import * as Types from './Types'

const DataTable = (config: Types.IConfig): JSX.Element => {
  const [curPage, setCurPage] = useState(0)
  const [pageCount, setPageCount] = useState(1)
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)
  const [rowGroups, setRowGroups] = useState<Types.IRow[][]>([])
  const [displayData, setDisplayData] = useState<Types.IRow[][]>([])
  const [filters, setFilters] = useState<{ [key: string]: string }>({})
  const [sortColumns, setSortColumns] = useState<{
    [key: string]: Types.SortDirection
  }>({})

  // handle column's sort event
  const onSort = (column: string) => {
    const newSortColumns = { ...sortColumns }
    let origin: Types.SortDirection | undefined
    if (column in newSortColumns) {
      origin = newSortColumns[column]
      delete newSortColumns[column]
      if (origin === 'ASC') {
        newSortColumns[column] = 'DESC'
      } else if (origin === 'DESC') {
        origin = undefined
      }
    } else {
      newSortColumns[column] = 'ASC'
    }
    setSortColumns(newSortColumns)
  }

  // handle column's filter event
  const onFilter = (column: string, value: string) => {
    const newFilters = { ...filters }
    if (value === '') {
      if (column in newFilters) {
        delete newFilters[column]
      }
    } else {
      newFilters[column] = value
    }
    setFilters(newFilters)
  }

  // compare two rows based on column and direction
  const compareRows = (
    a: Types.IRow,
    b: Types.IRow,
    d: Types.SortDirection,
    c: string
  ) => {
    if (d === 'ASC') {
      if (a[c] > b[c]) return 1
      if (a[c] < b[c]) return -1
      return 0
    } else {
      if (a[c] > b[c]) return -1
      if (a[c] < b[c]) return 1
      return 0
    }
  }

  // pageSize
  useEffect(() => {
    if (config.pageSize !== undefined && config.pageSize !== 0) {
      setPageSize(config.pageSize)
    } else {
      setPageSize(DEFAULT_PAGE_SIZE)
    }
  }, [config.pageSize])

  // rowGroups - body data
  useEffect(() => {
    const rows = config.data === undefined ? [] : config.data
    // group rows
    let groups: Types.IRow[][]
    if (config.groupBy !== undefined) {
      const key = config.groupBy.column
      const keys: { [key: string]: Types.IRow[] } = {}
      rows.forEach((row) => {
        const rowKey = row[key].toString()
        if (rowKey in keys) {
          keys[rowKey].push(row)
        } else {
          keys[rowKey] = []
        }
      })
      groups = []
      for (const [, value] of Object.entries(keys)) {
        groups.push(value)
      }
    } else {
      groups = rows.map((row) => [row])
    }
    // apply filter
    const filterKeys = Object.keys(filters)
    groups = groups
      .map((group) => {
        return group.filter((row) => {
          for (let i = 0; i < filterKeys.length; i++) {
            const filterColumn = filterKeys[i]
            const filterValue = filters[filterColumn]
            if (row[filterColumn].toString().search(filterValue) < 0)
              return false
          }
          return true
        })
      })
      .filter((group) => group.length > 0)
    // apply sort - sub rows, and then groups based on the first element of the rows
    groups = groups.map((group) => {
      let sortedGroup = group
      for (const sortKey in sortColumns) {
        const sortOrder = sortColumns[sortKey]
        sortedGroup = sortedGroup.sort((a, b) =>
          compareRows(a, b, sortOrder, sortKey)
        )
      }
      return sortedGroup
    })
    for (const sortKey in sortColumns) {
      const sortOrder = sortColumns[sortKey]
      groups = groups.sort((a, b) =>
        compareRows(a[0], b[0], sortOrder, sortKey)
      )
    }
    setRowGroups(groups)
    setCurPage(0)
  }, [config.data, config.groupBy, pageSize, sortColumns, filters])

  // Generate display data
  useEffect(() => {
    const rowGs = rowGroups
      .map((_e, i) => {
        return i % pageSize === 0 ? rowGroups.slice(i, i + pageSize) : []
      })
      .filter((e) => e.length > 0)
    setPageCount(rowGs.length)
    setDisplayData(rowGs.length > 0 ? rowGs[curPage] : [])
  }, [rowGroups, pageSize, curPage])

  return (
    <div>
      <DataTableHeader
        {...{ columns: config.columns, onSort, onFilter, filters, sortColumns }}
      ></DataTableHeader>
      <DataTableBody
        {...{
          data: displayData,
          groupSize: config.groupBy?.default || DEFAULT_GROUP_SIZE,
        }}
      ></DataTableBody>
      <DataTableFooter
        {...{
          curPage,
          pageCount,
          setCurPage,
        }}
      ></DataTableFooter>
    </div>
  )
}

export default DataTable
export * from './Types'
