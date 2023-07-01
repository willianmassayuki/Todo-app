import './styles/app.scss'
import Header from './components/Header'
import AppHeader from './components/AppHeader'

function App() {
  
  return (
    <>
      <Header />
      <div className="page-wrapper">
        <div className='main-container'>
          <div className="app-header">
            <AppHeader />
          </div>
        </div>       
      </div>
    </>
  )
}

export default App
