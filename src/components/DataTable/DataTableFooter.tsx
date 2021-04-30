import { useEffect, useState } from 'react'
import { DataTableFooterButton } from './Styles'

const DataTableFooter = (props: {
  curPage: number
  pageCount: number
  setCurPage: (newPage: number) => void
}): JSX.Element => {
  const [pages, setPages] = useState<number[]>([])

  // is next/prev/page available
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

  // on next/prev/page clicked
  const onPage = (page: 'next' | 'prev' | number) => {
    if (!available(page)) return
    let newPage: number
    if (page === 'next') newPage = props.curPage + 1
    else if (page === 'prev') newPage = props.curPage - 1
    else newPage = page
    if (newPage !== props.curPage) props.setCurPage(newPage)
  }

  const pushToArray = (arr: number[], val: number) => {
    if (arr.find((e) => e === val) === undefined) {
      arr.push(val)
    }
  }

  useEffect(() => {
    const np: number[] = []
    const cp = props.curPage,
      limit = props.pageCount
    pushToArray(np, 0)
    if (cp - 1 > 1) pushToArray(np, -1)
    if (cp - 1 > 0) pushToArray(np, cp - 1)
    pushToArray(np, cp)
    if (cp + 1 < limit) pushToArray(np, cp + 1)
    if (cp + 1 < limit - 1) pushToArray(np, -2)
    if (limit > 0) pushToArray(np, limit - 1)
    setPages(np)
  }, [props.curPage, props.pageCount])

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {pages.map((page) => {
        if (page === -1) {
          return (
            <div
              key={page}
              style={DataTableFooterButton}
              // onClick={() => onPage('prev')}
            >
              &hellip;
            </div>
          )
        } else if (page === -2) {
          return (
            <div
              key={page}
              style={DataTableFooterButton}
              // onClick={() => onPage('next')}
            >
              &hellip;
            </div>
          )
        } else {
          return (
            <div
              key={page}
              style={DataTableFooterButton}
              onClick={() => onPage(+page)}
            >
              {page}
            </div>
          )
        }
      })}
    </div>
  )
}

export default DataTableFooter
