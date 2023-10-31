import ReactSlider from "react-slider";
import './Thermometer.css';
import { useClimateContext } from "../../context/ClimateContext";
import { useEffect, useState } from "react";
function Thermometer() {
 
  const {temperature, setTemperature} = useClimateContext();
  const [currentTemperature, setCurrentTemperature] = useState(temperature);
  const [desiredTemperature, setDesiredTemperature] = useState(temperature);
  

  useEffect(() => {
    const timer = setTimeout(() => {
      slowlyChangeTemperature();

      // Clear the timer when the temperature matches the desired temperature
      if (temperature === desiredTemperature) {
        clearTimeout(timer);
      }
    }, 1000);

    // Cleanup function to clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [desiredTemperature, temperature]);
  
  
  const slowlyChangeTemperature = () => {
    if (desiredTemperature > temperature) {
      setTemperature(temperature + 1)
    } else if (desiredTemperature < temperature){
      setTemperature(temperature - 1)
    }
  }

  return (
    <section>
      <h2>Thermometer</h2>
      <div className="actual-temp">Actual Temperature: {temperature}°F</div>
      <ReactSlider
        value={temperature}
        onAfterChange={(val) => {setDesiredTemperature(val)}}
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