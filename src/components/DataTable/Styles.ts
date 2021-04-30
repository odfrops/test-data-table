import CSS from 'csstype'

export const DataTableStyle: CSS.Properties = {
  borderCollapse: 'collapse',
  width: '100%',
}

export const DataTableHeaderStyle: CSS.Properties = {
  paddingTop: '12px',
  paddingBottom: '12px',
  backgroundColor: '#4CAF50',
  color: 'white',
  position: 'relative',
}

export const DataTableRowStyle: CSS.Properties = {
  border: '1px solid #ddd',
}

export const DataTableRowExpandable: CSS.Properties = {
  backgroundColor: '#ccc',
}

export const DataTableFooterButton: CSS.Properties = {
  width: '30px',
  height: '30px',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  cursor: 'pointer',
  userSelect: 'none',
}
