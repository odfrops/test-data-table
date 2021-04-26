import React from 'react'
import './App.css'
import DataTable, { IOptions } from './components/DataTable'
import MockData from './MOCK_DATA.json'
const App = () : JSX.Element => {
  const options: IOptions  = {
    data: MockData,
    headers: Object.keys(MockData[0]),
  }
  return (
    <div className="App">
      <DataTable { ...options }></DataTable>
    </div>
  )
}

export default App
