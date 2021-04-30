import { SortDirection } from './Types'

const DataTableHeaderPopup = (props: {
  filterable: boolean
  filter: string
  sortable: boolean
  sort: SortDirection
  onFilter: (newFilter: string) => void
  onSort: () => void
}): JSX.Element => {
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        width: '150px',
      }}
    >
      <div
        style={{
          position: 'relative',
          left: '-50%',
          backgroundColor: '#d1d1d1',
          padding: '10px',
          boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
          color: 'black',
          marginTop: '12px',
          textAlign: 'center',
        }}
      >
        {props.filterable && (
          <div>
            <input
              style={{ width: 'calc(100% - 7px)' }}
              value={props.filter === undefined ? '' : props.filter}
              onChange={(e) => props.onFilter(e.target.value)}
            ></input>
          </div>
        )}
        {props.sortable && <div onClick={props.onSort}></div>}
        <div
          onClick={() => props.onSort()}
          style={{ paddingTop: '10px', cursor: 'pointer' }}
        >
          Sort : {props.sort === undefined ? 'NONE' : props.sort}
        </div>
      </div>
    </div>
  )
}

export default DataTableHeaderPopup
