import { useEffect, useState } from 'react'
import DataTableRow from './DataTableRow'
import { DataTableRowExpandable } from './Styles'
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
      {(!expandable || (expandable && expanded)) &&
        props.data.map((row, idx) => {
          return (
            <DataTableRow
              key={idx}
              {...{
                data: row,
                expand: () => {
                  setExpanded(false)
                },
              }}
            ></DataTableRow>
          )
        })}
      {expandable && !expanded && (
        <DataTableRow
          {...{
            data: props.data[0],
            rowStyle: DataTableRowExpandable,
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
