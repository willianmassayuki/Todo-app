import { useState } from 'react';
import '../styles/components/appHeader.scss';

const AppHeader = () => {
  
  const [dark, setDark] = useState(false);
  let [theme, setTheme] = useState('');
  const [inactive, setInactive] = useState(true);  
  let [classIn, setClassIn] = useState(['', 'inactive']);

  function ChangeTheme() {
    setDark(dark => !dark);
    setInactive(inactive => !inactive);
    changeClass();
  }

  function changeClass() {
    setTheme(theme = (dark ? 'dark' : ''));
    setClassIn(classIn = (inactive ? ['', 'inactive'] : ['inactive', '']));
  }

  return (
    <div className={`header-container ${theme}`}>
      <h1>TODO</h1>
      <input type="checkbox" id="modo" onChange={ChangeTheme} />
      <label htmlFor="modo"> 
        <img className={`${classIn[0]}`} src="images/icon-moon.svg" alt="Moon" />
        <img className={`${classIn[1]}`} src="images/icon-sun.svg" alt="Sun" />
      </label>
    </div>

  )
}

export default AppHeader
    