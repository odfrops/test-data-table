const DataTableFooter = (
  curPage: number,
  maxPage: number,
  updatePage: () => void
): JSX.Element => {
  return (
    <div onClick={updatePage}>
      <div>Footer</div>
      <div>{curPage}</div>
      <div>{maxPage}</div>
    </div>
  )
}

export default DataTableFooter
