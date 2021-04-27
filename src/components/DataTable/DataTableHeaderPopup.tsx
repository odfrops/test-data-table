import { SortDirection } from './DataTableOptions'

const DataTableHeaderPopup = (
  filter: string,
  updateFilter: (newFilter: string) => undefined,
  sort: SortDirection,
  updateSort: () => void
): JSX.Element => {
  return (
    <div>
      <div>HeaderPopup</div>
      <div onClick={updateFilter(filter)}>{filter}</div>
      <div onClick={updateSort}>{sort}</div>
    </div>
  )
}

export default DataTableHeaderPopup
