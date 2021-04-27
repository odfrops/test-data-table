export interface IRow {
  [propName: string]: number | string | boolean
}

export interface IColumn {
  name: string
  filterable: boolean
  sortable: boolean
}

export interface IGroup {
  column: string
  value: string
  default?: number
}

export interface IConfig {
  data?: Array<IRow>
  headers?: Array<IColumn | string>
  groupBy?: IGroup
}

export type SortDirection = 'ASC' | 'DESC'
