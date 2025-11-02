import ExchangeForm from './components/ExchangeForm/ExchangeForm'
import './App.css'

function App() {
  return (
    <div className="App">
      <div className="container">
        <header className="app-header">
          <h1>💱 Token Exchange</h1>
        </header>
        <ExchangeForm />
        <footer className="app-footer">
        </footer>
      </div>
    </div>
  )
}

export default App

