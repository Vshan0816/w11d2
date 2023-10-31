import ReactSlider from "react-slider";
import './Thermometer.css';
import { useClimateContext } from "../../context/ClimateContext";
import { useEffect } from "react";
function Thermometer() {
 
  const {temperature, setTemperature} = useClimateContext();

  useEffect(()=> {
    while (currentTemperature !== desiredTemperature) {
        setTimeout( slowlyChangeTemperature, 1000)
      }
  }, [temperature])

const slowlyChangeTemperature = (val) => {
  let currentTemperature = temperature
  let desiredTemperature = val
  let change = 0
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