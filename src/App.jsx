import './styles/app.scss'
import { useState, useEffect } from 'react';
import Header from './components/Header'
import AddItem from './components/AddItem'

function App() {
  
  const [dark, setDark] = useState(false);
  let [theme, setTheme] = useState('');
  const [inactive, setInactive] = useState(true);  
  let [classIn, setClassIn] = useState(['', 'inactive']);

  function ChangeTheme() {
    setDark(dark => !dark);
    setInactive(inactive => !inactive);
    changeClass();
    updateLocalStorage()
  }

  function changeClass() {
    setTheme(theme = (dark ? 'dark' : ''));
    setClassIn(classIn = (inactive ? ['', 'inactive'] : ['inactive', '']));
  }


  // Salvando o tema no LocalStorage
  useEffect(() => {
    loadDataFromStorage();
  }, []);

  function loadDataFromStorage() {
    const storedItems = localStorage.getItem('theme');
  
    if (storedItems) {
      setTheme(JSON.parse(storedItems));
    }
  }

  function updateLocalStorage() {
    localStorage.setItem('theme', JSON.stringify(theme));
  }

  return (
    <div id={`${theme}`}>
      <Header />
      <div className={`page-wrapper`}>
        <div className='main-container'>
          <div className="app-header">
          <div className={`header-container`}>
            <h1>TODO</h1>
            <input type="checkbox" id="modo" onChange={ChangeTheme} />
            <label htmlFor="modo"> 
              <img className={`${classIn[0]}`} src="images/icon-moon.svg" alt="Moon" />
              <img className={`${classIn[1]}`} src="images/icon-sun.svg" alt="Sun" />
            </label>
          </div>
          </div>
          <AddItem />
        </div>       
      </div>
    </div>
  )
}

export default App
