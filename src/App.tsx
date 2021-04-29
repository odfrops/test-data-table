import './App.css'
import DataTable, { IConfig } from './components/DataTable'
import MockData from './MOCK_DATA.json'
const App = (): JSX.Element => {
  const config: IConfig = {
    data: MockData,
    columns: Object.keys(MockData[0]).map((e) => ({
      name: e,
      filterable: true,
      sortable: true,
    })),
    pageSize: 15,
    groupBy: {
      column: 'car',
    },
  }
  return (
    <div className="App">
      <DataTable {...config}></DataTable>
    </div>
  )
}

export default App
