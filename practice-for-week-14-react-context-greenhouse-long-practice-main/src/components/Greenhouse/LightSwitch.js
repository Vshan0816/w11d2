import { useTheme } from '../../context/ThemeContext';
import './LightSwitch.css';

function LightSwitch() {

  const {themeName, setThemeName} = useTheme()
  const handleClick = (e) => {
    console.log(e.target.className)
    if (e.target.className === "on" ){
      setThemeName("day")
    } else {
      setThemeName("night")
    }
  }
  return (
    <div className={`light-switch ${themeName}`}>
      <div className="on" onClick={handleClick}>DAY</div>
      <div className="off" onClick={handleClick}>NIGHT</div>
    </div>
  );
}

export default LightSwitch;