export interface IRow {
  [propName: string]: number | string | boolean
}

export interface IColumn {
  name: string
  filterable?: boolean
  sortable?: boolean
}

export interface IGroupBy {
  column: string
  size?: number
}

export interface IConfig {
  data?: IRow[]
  columns: (IColumn | string)[]
  groupBy?: IGroupBy
  pageSize?: number
}

export type SortDirection = 'ASC' | 'DESC'
