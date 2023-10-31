import ReactSlider from "react-slider";
import './Thermometer.css';
import { useClimateContext } from "../../context/ClimateContext";
import { useEffect, useState } from "react";
function Thermometer() {
 
  const {temperature, setTemperature} = useClimateContext();
  const [currentTemperature, setCurrentTemperature] = useState(temperature);
  const [desiredTemperature, setDesiredTemperature] = useState(temperature);
  let change = 0;

  useEffect(()=> {
    while (currentTemperature !== desiredTemperature) {
      setTimeout(setTemperature(temperature + change), 1000)
      setCurrentTemperature(temperature + change)
    }
  }, [temperature, currentTemperature, desiredTemperature])

  const slowlyChangeTemperature = (val) => {
    setCurrentTemperature(temperature);
    setDesiredTemperature(val)
    
    if (desiredTemperature > currentTemperature) {
      change = 1
    } else if (desiredTemperature < currentTemperature){
      change = -1
    }
  }

  return (
    <section>
      <h2>Thermometer</h2>
      <div className="actual-temp">Actual Temperature: {"x"}°F</div>
      <ReactSlider
        value={temperature}
        onAfterChange={(val) => {slowlyChangeTemperature(val)}}
        className="thermometer-slider"
        thumbClassName="thermometer-thumb"
        trackClassName="thermometer-track"
        ariaLabel={"Thermometer"}
        orientation="vertical"
        min={0}
        max={120}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        renderTrack={(props, state) => (
          <div {...props} index={state.index}></div>
        )}
        invert
        pearling
        minDistance={1}
      />
    </section>
  );
}

export default Thermometer;