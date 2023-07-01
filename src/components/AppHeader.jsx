import '../styles/components/appHeader.scss';
import ChangeTheme from './ChangeTheme';

const appHeader = () => {
  return (
    <div className='header-container'>
      <h1>TODO</h1>
      <input type="checkbox" name="style-mode" id="modo" onChange={ChangeTheme} />
      <label htmlFor="modo">
        <img className="moon" src="images/icon-moon.svg" alt="Moon" />
        <img className="sun" src="images/icon-sun.svg" alt="Sun" />
      </label>
    </div>
  )
}

export default appHeader
    