import './App.css'
import DataTable, { IConfig } from './components/DataTable'
import MockData from './MOCK_DATA.json'
const App = (): JSX.Element => {
  const options: IConfig = {
    data: MockData,
    headers: Object.keys(MockData[0]),
  }
  return (
    <div className="App">
      <DataTable {...options}></DataTable>
    </div>
  )
}

export default App
