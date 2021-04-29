const DataTableFooter = (props: {
  curPage: number
  pageCount: number
  setCurPage: (newPage: number) => void
}): JSX.Element => {
  // Just build UI
  const available = (page: 'next' | 'prev' | number) => {
    if (page === 'next') {
      if (props.curPage + 1 < props.pageCount) return true
    } else if (page === 'prev') {
      if (props.curPage > 0) return true
    } else {
      if (page >= 0 && page < props.pageCount) return true
    }
    return false
  }

  const onPage = (page: 'next' | 'prev' | number) => {
    if (!available(page)) return
    let newPage: number
    if (page === 'next') newPage = props.curPage + 1
    else if (page === 'prev') newPage = props.curPage - 1
    else newPage = page
    if (newPage !== props.curPage) props.setCurPage(newPage)
  }

  return (
    <div>
      <div>Footer</div>
      <div onClick={() => onPage(0)}>Start page</div>
      <div onClick={() => onPage('prev')}>Prev page</div>
      <div>Current page: {props.curPage}</div>
      <div onClick={() => onPage('next')}>Next page</div>
      <div>Page count: {props.pageCount}</div>
      <div onClick={() => onPage(props.pageCount - 1)}>End page</div>
    </div>
  )
}

export default DataTableFooter
