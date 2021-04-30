import { useEffect, useState } from 'react'
import DataTableRow from './DataTableRow'
import {
  DataTableRowFirstExpandaded,
  DataTableRowFirstCollapsed,
  DataTableRowNormal,
} from './Styles'
import { IRow } from './Types'

const DataTableRowGroup = (props: {
  data: IRow[]
  groupSize: number
}): JSX.Element => {
  const [expanded, setExpanded] = useState(false)
  const [expandable, setExpandable] = useState(false)

  useEffect(() => {
    if (props.data.length <= 1) {
      setExpandable(false)
    } else {
      if (props.data.length > props.groupSize) {
        setExpandable(true)
      } else {
        setExpandable(false)
      }
    }
  }, [props.groupSize, props.data])

  return (
    <>
      {!expandable &&
        props.data.map((row, idx) => {
          if (idx == 0) {
            return (
              <DataTableRow
                key={idx}
                {...{
                  rowIndex: idx,
                  data: row,
                  expandable: 'Unexpandable',
                  rowStyle: DataTableRowFirstExpandaded,
                  expand: () => {
                    setExpanded(false)
                  },
                }}
              ></DataTableRow>
            )
          } else {
            return (
              <DataTableRow
                key={idx}
                {...{
                  rowIndex: idx,
                  data: row,
                  expandable: 'Unexpandable',
                  rowStyle: DataTableRowNormal,
                  expand: () => {
                    setExpanded(false)
                  },
                }}
              ></DataTableRow>
            )
          }
        })}
      {expandable &&
        expanded &&
        props.data.map((row, idx) => {
          if (idx == 0) {
            return (
              <DataTableRow
                key={idx}
                {...{
                  rowIndex: idx,
                  data: row,
                  expandable: 'Expanded',
                  rowStyle: DataTableRowFirstCollapsed,
                  expand: () => {
                    setExpanded(false)
                  },
                }}
              ></DataTableRow>
            )
          } else {
            return (
              <DataTableRow
                key={idx}
                {...{
                  rowIndex: idx,
                  data: row,
                  expandable: 'Expanded',
                  rowStyle: DataTableRowNormal,
                  expand: () => {
                    setExpanded(false)
                  },
                }}
              ></DataTableRow>
            )
          }
        })}
      {expandable && !expanded && (
        <DataTableRow
          key="0"
          {...{
            rowIndex: 0,
            data: props.data[0],
            expandable: 'Collapsed',
            rowStyle: DataTableRowFirstCollapsed,
            expand: () => {
              setExpanded(true)
            },
          }}
        ></DataTableRow>
      )}
    </>
  )
}

export default DataTableRowGroup
