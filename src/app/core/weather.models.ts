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