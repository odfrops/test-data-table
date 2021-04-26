export interface IRow {
  [propName: string]: number | string | boolean;
}

export interface IColumn {
  name: string
  filterable: boolean
  sortable: boolean
}

export interface IOptions {
  data: Array<IRow>
  headers: Array<IColumn | string>
}
