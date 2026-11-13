export interface City {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface DailyForecast {
  date: string;
  tempMax: number;
  tempMin: number;
  weatherCode: number;
}

export interface Forecast {
  current: { temperature: number; weatherCode: number; windSpeed: number };
  daily: DailyForecast[];
}

export interface GeocodingResponse {
  results?: {
    id: number;
    name: string;
    country: string;
    latitude: number;
    longitude: number;
  }[];
}

export interface ForecastResponse {
  current: {
    temperature_2m: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
  };
}