import { useState } from 'react';
import '../styles/components/appHeader.scss';

const AppHeader = () => {
  const [dark, setDark] = useState(false);
  const [theme, setTheme] = useState('');

  function ChangeTheme() {
    setDark(!dark);
    setTheme(dark ? 'dark' : '')
    console.log(theme)
  }

  return (
    <div className={`header-container ${theme}`}>
      <h1>TODO</h1>
      <input type="checkbox" id="modo" onChange={ChangeTheme} />
      <label htmlFor="modo"> 
        <img className="moon" src="images/icon-moon.svg" alt="Moon" />
        <img className="sun" src="images/icon-sun.svg" alt="Sun" />
      </label>
    </div>

  )
}

export default AppHeader
    