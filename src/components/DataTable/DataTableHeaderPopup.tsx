import { SortDirection } from './Types'

const DataTableHeaderPopup = (props: {
  filterable: boolean
  filter: string
  sortable: boolean
  sort: SortDirection
  popup: boolean
  togglePopup: (value: boolean) => void
  onFilter: (newFilter: string) => void
  onSort: () => void
}): JSX.Element => {
  // Just build UI
  return (
    <div>
      {props.filterable && props.popup && (
        <div>
          <div onClick={() => props.togglePopup(false)}>Close</div>
          <input
            value={props.filter}
            onChange={(e) => props.onFilter(e.target.value)}
          ></input>
        </div>
      )}
      {props.filterable && !props.popup && (
        <div onClick={() => props.togglePopup(true)}>Show</div>
      )}
      {props.sortable && <div onClick={props.onSort}></div>}
      <div onClick={() => props.onSort()}>Sort : {props.sort}</div>
    </div>
  )
}

export default DataTableHeaderPopup
