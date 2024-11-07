import React, { useEffect, useContext, useState } from "react";

import TemperatureCard from "../../../../examples/Cards/StatisticsCards/TemperatureCard";
import { TempContext } from "../../../../lib/realtime/temp/temp_realtime";

import rainGif from "../../../../assets/images/gif/calm-5979_256.gif";
import cloudGif from "../../../../assets/images/gif/tenor.gif"
import clearGif from "../../../../assets/images/gif/clear.gif"
import thunderstormGif from "../../../../assets/images/gif/thunderstorm.gif"
import sunnyGif from "../../../../assets/images/gif/sunny.gif"

function TemperatureStaticCard() {
    const { tempData, setArea } = useContext(TempContext);

    const [data, setData] = useState(undefined);
    const [description, setDescription] = useState(undefined);
    const [bgGif, setBGGif] = useState(undefined);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [tab, setTab] = useState('NK2');
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        setArea(tab)
    }, [tab]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.weatherapi.com/v1/current.json?key=2f8fe0a1e7c8471cb1c43209241902&q=rawang&aqi=yes');

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const result = await response.json();
                setData(result);
                setDescription(result?.current.condition.text);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const main = data?.current.condition.text;

        switch (main) {
            case "Snow":
                setBGGif("url('https://mdbgo.io/ascensus/mdb-advanced/img/snow.gif')");
                break;
            case "Clouds":
            case "Partly cloudy":
                setBGGif(`url(${cloudGif})`);
            case "Fog":
            case "Mist":
                setBGGif("url('https://mdbgo.io/ascensus/mdb-advanced/img/fog.gif')");
                break;
            case "Moderate or heavy rain with thunder": 
            case "Rain":
                setBGGif(`url(${rainGif})`);
                break;
            case "Clear":
                setBGGif(`url(${clearGif})`);
                break;
            case "Thunderstorm":
            case "Patchy light rain with thunder":
                setBGGif(`url(${thunderstormGif})`);
                break;
            default:
                setBGGif(`url(${sunnyGif})`);
                break;
        }
    }, [data]);

    return (
        <TemperatureCard
            anchorEl={anchorEl}
            open={open}
            tab={tab}
            setTab={setTab}
            handleClick={handleClick}
            handleClose={handleClose}
            data={tempData?.latest}
            description={description}
            bgGif={bgGif}
        />
    );
}


export default TemperatureStaticCard;
