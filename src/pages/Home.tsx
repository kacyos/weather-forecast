import { useContext, useEffect, useState } from "react";
import { api } from "../services";
import { MdArrowUpward } from "react-icons/md";
import { ImMeter } from "react-icons/im";
import { GiWinterHat } from "react-icons/gi";
import { FaRegEye } from "react-icons/fa";
import {
  BsWind,
  BsDropletHalf,
  BsThermometerSun,
  BsThermometerSnow,
  BsThermometerHalf,
  BsMoonStarsFill,
  BsFillSunFill,
} from "react-icons/bs";

import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import logo_light from "../assets/logo_light.svg";
import logo_dark from "../assets/logo_dark.svg";
import { StyledListItemIcon } from "../css/styles";
import { ThemeContextApp } from "../context/themeContextApp";

type GeoLocation = {
  country: string;
  lat: number;
  lon: number;
  name: string;
  local_names: { pt: string; en: string };
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

export const Home = () => {
  const [city, setCity] = useState("");
  const [geoLocation, setGeoLocation] = useState<GeoLocation>();
  const [weatherData, setWeatherData] = useState<WeatherData>();

  const { handleTheme, theme } = useContext(ThemeContextApp);

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
      console.error(error);
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
      setWeatherData(response);
    } catch (error) {
      console.error(error);
    }
  };

  const convertDate = (UTCdate = 0): string | undefined => {
    const dateInMilliseconds = UTCdate * 1000;
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

  return (
    <Grid container justifyContent="center" alignItems="center" gap={4}>
      <Grid sm={12} pl={4}>
        <FormControlLabel
          label={"Tema"}
          control={
            <Switch
              icon={<BsFillSunFill color="#fbff03" size={20} />}
              checkedIcon={<BsMoonStarsFill color="#1020c7" size={20} />}
              onChange={() => handleTheme()}
              sx={{ m: 1 }}
              defaultChecked={theme.name == "dark"}
            />
          }
        />
      </Grid>

      <Grid item sm={6}>
        <Box width="100%">
          <Box
            component="img"
            p={2}
            src={`${theme.name == "dark" ? logo_dark : logo_light}`}
            maxWidth="100%"
          />
        </Box>
      </Grid>

      <Grid
        item
        sm={6}
        display="flex"
        justifyContent="center"
        columnGap={2}
        mx={2}
      >
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
      {weatherData && (
        <Grid item sm={6} mt={2} mb={8} mx={2}>
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
                    {geoLocation?.local_names.pt || geoLocation?.local_names.en}
                    /{geoLocation?.country}
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
      )}
    </Grid>
  );
};
