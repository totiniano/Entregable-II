//import React, { useState } from "react";
import React, { useState, useEffect } from "react";

const WeatherCard = ({ weather, temperature }) => {
    const [isCelsius, setIsCelsius] = useState(true);
    const [currentDate, setCurrentDate] = useState(new Date());

    const handleChangeTemperature = () => setIsCelsius(!isCelsius);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <article className="screenTimezone">
                <h1>Weather App</h1>
                <h2>
                    {weather?.name}, {weather?.sys.country}
                </h2>
                <div className="dateTime">
                    <h3>DateTime: {currentDate.toLocaleString("es-PE")}</h3>
                </div>
                <section className="mainp">
                    <header className="img-container">
                        <img
                            src="/backgrounds/clound.png"
                            alt="tree Background"
                        />
                    </header>

                    <article className="reporEstadis">
                        <h3>"{weather?.weather[0].description}"</h3>
                        <ul>
                            <li>
                                <span>Wind Speed</span> {weather?.wind.speed}{" "}
                                m/s
                            </li>
                            <li>
                                <span>Clouds</span>
                                {weather?.clouds.all} %
                            </li>
                            <li>
                                <span>Pressure</span>
                                <p>{weather?.main.pressure} hPa </p>
                            </li>
                        </ul>
                    </article>
                </section>
                <footer>
                    <h2>
                        {isCelsius
                            ? `${temperature?.celsius} ºC`
                            : `${temperature?.farenheit} ºF`}
                    </h2>
                    <button
                        className="btn_change"
                        onClick={handleChangeTemperature}
                    >
                        Change to {isCelsius ? "ºF" : "ºC"}
                    </button>
                </footer>
            </article>
        </div>
    );
};

export default WeatherCard;
