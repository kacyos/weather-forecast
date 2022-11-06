import { useEffect, useState } from "react";
import { api } from "../services";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";
import { ImMeter } from "react-icons/im";
import { GiWinterHat } from "react-icons/gi";
import { FaRegEye } from "react-icons/fa";
import {
  BsWind,
  BsDropletHalf,
  BsThermometerSun,
  BsThermometerSnow,
  BsThermometerHalf,
} from "react-icons/bs";

import {
  Box,
  Button,
  Container,
  Grid,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import Logo from "../assets/logo.svg";
import { light } from "../css/theme";
import { StyledListItemIcon } from "../css/styles";

type GeoLocation = {
  country: string;
  lat: number;
  lon: number;
  name: { pt: string };
  state: string;
};

type WeatherData = {
  weather: [
    {
      id: number;
      description: string;
      icon: string;
    }
  ];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  dt: number;
  timezone: number;
  name: string;
};

const Home = () => {
  const [city, setCity] = useState("");
  const [geoLocation, setGeoLocation] = useState<GeoLocation>();
  const [weatherData, setWeatherData] = useState<WeatherData>();

  const getGeoLocalization = async () => {
    try {
      const { data: response } = await api.get("geo/1.0/direct", {
        params: {
          q: city,
        },
      });

      const [location] = response;

      setGeoLocation(location);
    } catch (error) {
      console.error("Deu ruim!");
    }
  };

  const getWeatherData = async () => {
    try {
      const { data: response } = await api.get("data/2.5/weather", {
        params: {
          lat: geoLocation?.lat,
          lon: geoLocation?.lon,
          units: "metric",
          lang: "pt_br",
        },
      });
      console.log(response);
      setWeatherData(response);
    } catch (error) {}
  };

  const convertDate = (date = 0): string | undefined => {
    const dateInMilliseconds = date * 1000;
    const convertedDate = new Date(dateInMilliseconds).toLocaleString("pt-BR");
    return convertedDate;
  };

  const convertMeterToKilometer = (meter = 0) => {
    const kilometer = meter / 1000;
    return kilometer;
  };

  useEffect(() => {
    geoLocation ? getWeatherData() : null;
  }, [geoLocation]);

  /*
  
  image: http://openweathermap.org/img/w/{icon}.png 
  wind-icon: import AirIcon from '@mui/icons-material/Air';
  pressure: import CompressIcon from '@mui/icons-material/Compress'; - pressão at
  temp_max: import ThermostatIcon from '@mui/icons-material/Thermostat';
  temp_min: import AcUnitIcon from '@mui/icons-material/AcUnit';
  import { width } from '@mui/system';

  
  
  */

  /* useEffect(() => {
    getWeatherData();
  }, [value]);*/
  // sx={{ background: "#8eb4c5" }}
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      gap={4}
      bgcolor={light.palette.background.default}
    >
      <Grid item sm={6}>
        <Box width="100%">
          <Box component="img" p={2} src={Logo} maxWidth="100%" />
        </Box>
      </Grid>

      <Grid item sm={6} display="flex" justifyContent="center" columnGap={2}>
        <TextField
          label="Cidade"
          variant="outlined"
          onChange={(e) => setCity(e.target.value)}
          size="small"
          fullWidth
        />

        <Button variant="contained" onClick={getGeoLocalization}>
          Pesquisar
        </Button>
      </Grid>

      <Grid item sm={6} m={2}>
        <Paper elevation={24}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            p={2}
            rowGap={2}
          >
            <Grid item>
              <Box
                display="flex"
                justifyContent="center"
                flexWrap="wrap"
                gap={2}
              >
                <Typography variant="body1" component="span">
                  {geoLocation?.state}/{geoLocation?.country}
                </Typography>
                <Typography variant="body1" component="span">
                  {convertDate(weatherData?.dt)}
                </Typography>
              </Box>
            </Grid>

            <Grid item sm={12} alignItems="center">
              <Box display="flex" justifyContent="center" alignItems="center">
                <Box
                  component="img"
                  p={2}
                  src={`http://openweathermap.org/img/w/${weatherData?.weather[0].icon}.png`}
                />
                <Typography variant="h5">
                  {weatherData?.weather[0].description}
                </Typography>
              </Box>
            </Grid>

            <Grid item md={6} sm={12}>
              <List>
                <ListItem>
                  <StyledListItemIcon>
                    <BsThermometerHalf color="#212121" size={20} />
                  </StyledListItemIcon>
                  <ListItemText
                    primary={`Temperatura: ${weatherData?.main.temp}ºC`}
                  />
                </ListItem>
                <ListItem>
                  <StyledListItemIcon>
                    <BsThermometerSnow color="#01579b" size={20} />
                  </StyledListItemIcon>
                  <ListItemText
                    primary={`Temperatura mínima: ${weatherData?.main.temp_min}ºC`}
                  />
                </ListItem>
                <ListItem>
                  <StyledListItemIcon>
                    <BsThermometerSun color="#f44336" size={20} />
                  </StyledListItemIcon>
                  <ListItemText
                    primary={`Temperatura máxima: ${weatherData?.main.temp_max}ºC`}
                  />
                </ListItem>
                <ListItem>
                  <StyledListItemIcon>
                    <GiWinterHat color="#01579b" size={20} />
                  </StyledListItemIcon>
                  <ListItemText
                    primary={`Sensação térmica: ${weatherData?.main.feels_like}ºC`}
                  />
                </ListItem>
              </List>
            </Grid>

            <Grid item md={6} sm={12}>
              <List>
                <ListItem>
                  <StyledListItemIcon>
                    <BsDropletHalf color="#01579b" size={20} />
                  </StyledListItemIcon>
                  <ListItemText
                    primary={`Umidade: ${weatherData?.main.humidity}%`}
                  />
                </ListItem>
                <ListItem>
                  <StyledListItemIcon>
                    <ImMeter color="#212121" size="20" />
                  </StyledListItemIcon>
                  <ListItemText
                    primary={`Pressão Atmosférica: ${weatherData?.main.pressure}hPa`}
                  />
                </ListItem>
                <ListItem>
                  <StyledListItemIcon>
                    <FaRegEye size={20} color="#212121" />
                  </StyledListItemIcon>
                  <ListItemText
                    primary={`Visibilidade: ${convertMeterToKilometer(
                      weatherData?.visibility
                    )} Km`}
                  />
                </ListItem>

                <ListItem>
                  <StyledListItemIcon>
                    <BsWind color="#01579b" size={20} />
                  </StyledListItemIcon>

                  <ListItemText sx={{ flex: "0 0 auto" }}>
                    {`Vento: ${weatherData?.wind.speed}m/s`}{" "}
                  </ListItemText>

                  <StyledListItemIcon rotate={weatherData?.wind.deg}>
                    <MdArrowUpward size={22} color="#212121" />
                  </StyledListItemIcon>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export { Home };
/*

<InputAutoComplete
        onInputChange={getGeoLocalization}
        onChange={setValue}
        optionsArray={geoLocations}
        getDataWhenChangeInput={getGeoLocalization}
      />
*/
