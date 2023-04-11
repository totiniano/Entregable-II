import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import moment from "moment";

function App() {
    const [latlon, setLatlon] = useState();
    const [weather, setWeather] = useState();
    const [temperature, setTemperature] = useState();

    const [backgroundImage, setBackgroundImage] = useState("");

    const appStyle = {
        backgroundImage: `url('/backgrounds/Fondo1.jpg')`,
        backgroundSize: "100vw 100vh",
        position: "relative",
    };

    useEffect(() => {
        const success = (pos) => {
            const obj = {
                lat: pos.coords.latitude,
                lon: pos.coords.longitude,
            };
            setLatlon(obj);
        };

        const error = () => {
            console.log(error);
        };

        navigator.geolocation.getCurrentPosition(success, error);
    }, []);

    useEffect(() => {
        if (latlon) {
            const apikey = "48aa31d45f8c1b40a2eefd60e352ffb4";
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latlon.lat}&lon=${latlon.lon}&appid=${apikey}`;
            axios
                .get(url)
                .then((res) => {
                    const celsius = (res.data.main.temp - 273.15).toFixed(1);
                    const farenheit = ((celsius * 9) / 5 + 32).toFixed(1);
                    setTemperature({ celsius, farenheit });
                    setWeather(res.data);
                })
                .catch((err) => console.log(err));
        }
    }, [latlon]);

    useEffect(() => {
        const updateBackground = () => {
            const currentDate = moment();
            const currentHour = currentDate.hours();
            if (currentHour >= 19 || currentHour < 6) {
                setBackgroundImage("/backgrounds/Fondo1.jpg");
            } else {
                setBackgroundImage("/backgrounds/Fondo2.jpg");
            }
        };

        updateBackground();
        const interval = setInterval(updateBackground, 60 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={appStyle} className="App">
            <div className="_styleimg">
                <WeatherCard weather={weather} temperature={temperature} />
            </div>
        </div>
    );
}

export default App;
