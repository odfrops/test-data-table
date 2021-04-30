import DataTable from './index'
import {
  DEFAULT_PAGE_SIZE,
  SAMPLE_DATA_EMPTY,
  SAMPLE_COLUMNS_TEXT,
  SAMPLE_COLUMNS_SORTABLE,
  SAMPLE_COLUMNS_WRONG_COUNT,
  SAMPLE_COLUMNS_WRONG_ORDER,
  SAMPLE_DATA_10,
  SAMPLE_DATA_100,
} from './Constants'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { fireEvent } from '@testing-library/dom'

let container: HTMLDivElement
beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  unmountComponentAtNode(container)
  container.remove()
})

describe('Empty data', () => {
  it('No rows check', () => {
    act(() => {
      const config = {
        data: SAMPLE_DATA_EMPTY,
        columns: SAMPLE_COLUMNS_TEXT,
        pageSize: DEFAULT_PAGE_SIZE,
      }
      render(<DataTable {...config}></DataTable>, container)
    })

    const tableBody = document.querySelector("[data-testid='body']")
    expect(tableBody?.textContent).toEqual('')
  })
})

describe('Header/data mismatch', () => {
  it('Wrong count', () => {
    act(() => {
      const config = {
        data: SAMPLE_DATA_10,
        columns: SAMPLE_COLUMNS_WRONG_COUNT,
        pageSize: DEFAULT_PAGE_SIZE,
      }
      render(<DataTable {...config}></DataTable>, container)
    })

    const tableBody = document.querySelector("[data-testid='body']")
    expect(tableBody?.textContent).toEqual('')
  })
  it('Wrong order', () => {
    act(() => {
      const config = {
        data: SAMPLE_DATA_10,
        columns: SAMPLE_COLUMNS_WRONG_ORDER,
        pageSize: DEFAULT_PAGE_SIZE,
      }
      render(<DataTable {...config}></DataTable>, container)
    })

    const tableBody = document.querySelector("[data-testid='body']")
    expect(tableBody?.textContent).toEqual('')
  })
})

describe('Group by value', () => {
  it('Group count check', () => {
    const GROUP_SIZE = 3
    act(() => {
      const config = {
        data: SAMPLE_DATA_100,
        columns: SAMPLE_COLUMNS_TEXT,
        pageSize: DEFAULT_PAGE_SIZE,
        groupBy: {
          column: 'car',
          size: GROUP_SIZE,
        },
      }
      render(<DataTable {...config}></DataTable>, container)
    })
    const rows = document.querySelectorAll("[data-testid='row_0']")
    expect(rows.length).toBe(DEFAULT_PAGE_SIZE)
  })
  it('Collapsed VS Expanded', () => {
    const GROUP_SIZE = 3
    act(() => {
      const config = {
        data: SAMPLE_DATA_100,
        columns: SAMPLE_COLUMNS_TEXT,
        pageSize: DEFAULT_PAGE_SIZE,
        groupBy: {
          column: 'car',
          size: GROUP_SIZE,
        },
      }
      render(<DataTable {...config}></DataTable>, container)
    })
    let rows = document.querySelectorAll('tr')
    const rowCount = rows.length

    rows = document.querySelectorAll("[data-testid='row_0']")
    act(() => {
      rows[0].dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    rows = document.querySelectorAll('tr')
    expect(rows.length).toBe(rowCount + GROUP_SIZE)
  })
})

describe('Sort', () => {
  it('Sorted correctly', () => {
    act(() => {
      const config = {
        data: SAMPLE_DATA_100,
        columns: SAMPLE_COLUMNS_SORTABLE,
        pageSize: DEFAULT_PAGE_SIZE,
        groupBy: {
          column: 'car',
          size: 3,
        },
      }
      render(<DataTable {...config}></DataTable>, container)
    })

    const emailDiv = document.querySelector('th:nth-child(4) > div')
    act(() => {
      emailDiv?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    const sortDiv = document.querySelector(
      'th:nth-child(4) > div:nth-child(2) > div > div:nth-child(2)'
    )
    act(() => {
      sortDiv?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    const rows = document.querySelectorAll("[data-testid='row_0']")
    const emails: string[] = []
    rows.forEach((row) => {
      const etext = row.querySelector('td:nth-child(4)')?.textContent
      if (etext !== null && etext !== undefined) emails.push(etext)
    })
    expect(emails).toBe(emails.sort())
  })
})

describe('Filter', () => {
  it('Filtered correctly', () => {
    act(() => {
      const config = {
        data: SAMPLE_DATA_100,
        columns: SAMPLE_COLUMNS_SORTABLE,
        pageSize: DEFAULT_PAGE_SIZE,
        groupBy: {
          column: 'car',
          size: 3,
        },
      }
      render(<DataTable {...config}></DataTable>, container)
    })

    const genderDiv = document.querySelector('th:nth-child(5) > div')
    act(() => {
      genderDiv?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    const filterInput: HTMLInputElement = document.querySelector(
      'th:nth-child(5) > div > div > div:nth-child(1) > input'
    ) as HTMLInputElement
    act(() => {
      fireEvent.change(filterInput, { target: { value: 'Male' } })
    })
    const rows = document.querySelectorAll('table > tbody > tr')
    let male = true
    rows.forEach((row) => {
      const etext = row.querySelector('td:nth-child(5)')?.textContent
      if (etext !== null && etext !== undefined && etext !== 'Male') {
        male = false
      }
    })
    expect(male).toBe(true)
  })
})

describe('Navigation', () => {
  it('Page count', () => {
    act(() => {
      const config = {
        data: SAMPLE_DATA_100,
        columns: SAMPLE_COLUMNS_SORTABLE,
        pageSize: DEFAULT_PAGE_SIZE,
      }
      render(<DataTable {...config}></DataTable>, container)
    })
    const footer = document.querySelectorAll('div > div > div > div')
    const lastPage = footer[footer.length - 1]
    const pageCount =
      lastPage.textContent === null
        ? 0
        : Number.parseInt(lastPage.textContent) + 1

    expect(pageCount).toBe(
      Math.ceil(SAMPLE_DATA_100.length / DEFAULT_PAGE_SIZE)
    )
  })
})

describe('Navigation', () => {
  it('Page count', () => {
    act(() => {
      const config = {
        data: SAMPLE_DATA_100,
        columns: SAMPLE_COLUMNS_SORTABLE,
        pageSize: DEFAULT_PAGE_SIZE,
      }
      render(<DataTable {...config}></DataTable>, container)
    })
    const footer = document.querySelectorAll('div > div > div > div')
    const lastPage = footer[footer.length - 1]
    const pageCount =
      lastPage.textContent === null
        ? 0
        : Number.parseInt(lastPage.textContent) + 1

    expect(pageCount).toBe(
      Math.ceil(SAMPLE_DATA_100.length / DEFAULT_PAGE_SIZE)
    )
  })
})
