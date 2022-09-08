import { useState } from "react";
import "./App.scss";

const api = {
  myKey: process.env.REACT_APP_KEY,
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [country, setCountry] = useState("");
  const [weather, setWeather] = useState({});
  console.log(api.myKey);
  const handelChange = (e) => {
    //console.log("hi from handelChange");
    setCountry((country) => e.target.value);
  };
  console.log("hallo");
  const handelSubmit = (e) => {
    e.preventDefault();
    fetch(`${api.base}weather?q=${country}&units=metric&APPID=${api.myKey}`)
      .then((response) => response.json())
      .then((result) => {
        setWeather(result);
        console.log(result);
      });
  };

  const dateFunction = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "Jun",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return ` ${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 25
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main className="s-box">
        <form className="s-bar" onSubmit={handelSubmit}>
          <input
            type="text"
            className="s-bar"
            placeholder="Location"
            value={country}
            onChange={handelChange}
          />
        </form>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="loc-box">
              <div className="loc">
                {weather.name},{weather.sys?.country}
              </div>
              <div className="date">{dateFunction(new Date())}</div>
            </div>

            <div className="w-box">
              <div className="temp">{Math.round(weather.main.temp)} °C</div>
              <div className="w">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
