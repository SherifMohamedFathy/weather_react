import React, { useEffect, useRef, useState } from "react";
import img1 from "../assets/clear.png";
import img2 from "../assets/clouds.png";
import img3 from "../assets/rain.png";
import img4 from "../assets/barometer.png";
import img5 from "../assets/humidity.png";
import axios from "axios";

export default function Weather() {
  const [temp, setTemp] = useState(null);
  const [name, setName] = useState("cairo");
  const [status, setStatus] = useState("");
  const [humidity, setHumidity] = useState("");
  const [pressure, setPressure] = useState("");
  const [celsius, setCelsius] = useState(null);
  const [feh, setFeh] = useState(null);
  const [flag1, setFlag1] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const reference = useRef();
  const apiKey = "d0f897be5fa8fb9ea382245da36e3f31";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=en";

  const [city, setCity] = useState(null);
  function handleInput() {
    let val = reference.current.value;
    setCity(val);
    console.log(val);
    reference.current.value = "";
  }
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleInput();
    }
  }
  async function getData() {
    try {
      let response = await axios.get(`${apiUrl}&q=${city ? city : "giza"}&appid=${apiKey}`);
      console.log(response);

      let temCelsius = response.data.main.temp;
      let fehrnhite = Math.round(Number(temCelsius * 1.8 + 32));
      setFeh(fehrnhite);
      console.log(fehrnhite);

      setCelsius(Math.round(temCelsius));
      console.log(temCelsius);

      setTemp(response.data.main.temp);
      setName(response.data.name);
      setStatus(response.data.weather[0].main);
      setHumidity(response.data.main.humidity);
      setPressure(response.data.main.pressure);
    } catch (error) {
      console.error("error fetching data:", error);
    }
  }
  function handleFahrenheit() {
    console.log(feh);
    setFlag1(true);
    setFlag2(false);
    return feh;
  }
  function handleCelsius() {
    setFlag2(true);
    setFlag1(false);
    console.log(celsius);
    return celsius;
  }

  useEffect(() => {
    getData();
  }, [city]);

  return (
    <div className="weather-content">
      <h1>Weather App </h1>

      <div className="inputs">
        <input type="text" placeholder="Enter city name" onKeyDown={handleKeyDown} ref={reference} />
        <button onClick={() => handleInput()}>Search</button>
      </div>
      <div className="weather-body">
        <div className="imgs">
          {status === "Clouds" || status === "Mist" ? (
            <img src={img2} alt="img2" />
          ) : status === "Drizzle" || status === "Rain" ? (
            <img src={img3} alt="img3" />
          ) : status === "Clear" ? (
            <img src={img1} alt="img1" />
          ) : (
            ""
          )}
        </div>

        <h2>
          {/* {celsius ? (temp !== null ? Math.round(temp) : "--") : feh} */}
          {flag1 ? feh : celsius}
          <sup>o</sup>
          {flag1 ? "F" : "C"}
        </h2>
        <h3>{name || "--"}</h3>

        <div className="icons d-flex   justify-content-center  mt-5">
          <div className="humidity align-items-center d-flex justify-content-center ">
            <img src={img5} alt="img5" />
            <div className="content text-white">
              <h4 className="mb-0">{humidity} %</h4>
              <p>Humidity</p>
            </div>
          </div>
          <div className="pressure d-flex  align-items-center text-white justify-content-center ">
            <img src={img4} alt="img4" />
            <div className="content">
              <h4 className="mb-0">{pressure}</h4>
              <p>Air pressure</p>
            </div>
          </div>
        </div>
        <div className="btns">
          <p onClick={handleCelsius}>
            <sup>o</sup>C
          </p>
          <p onClick={handleFahrenheit}>
            <sup>o</sup>F
          </p>
        </div>
      </div>
    </div>
  );
}
// api key   d0f897be5fa8fb9ea382245da36e3f31
// http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}
