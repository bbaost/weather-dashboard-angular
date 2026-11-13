import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { City, Forecast } from './weather.models';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private http = inject(HttpClient);

  searchCities(query: string): Observable<City[]> {
    return this.http
      .get<any>('https://geocoding-api.open-meteo.com/v1/search', {
        params: { name: query, count: 5, language: 'en' },
      })
      .pipe(
        map((res) =>
          (res.results ?? []).map((r: any) => ({
            id: r.id,
            name: r.name,
            country: r.country,
            latitude: r.latitude,
            longitude: r.longitude,
          })),
        ),
      );
  }

  getForecast(lat: number, lon: number): Observable<Forecast> {
    return this.http
      .get<any>('https://api.open-meteo.com/v1/forecast', {
        params: {
          latitude: lat,
          longitude: lon,
          current: 'temperature_2m,weather_code,wind_speed_10m',
          daily: 'temperature_2m_max,temperature_2m_min,weather_code',
          forecast_days: 5,
          timezone: 'auto',
        },
      })
      .pipe(
        map((res) => ({
          current: {
            temperature: res.current.temperature_2m,
            weatherCode: res.current.weather_code,
            windSpeed: res.current.wind_speed_10m,
          },
          daily: res.daily.time.map((date: string, i: number) => ({
            date,
            tempMax: res.daily.temperature_2m_max[i],
            tempMin: res.daily.temperature_2m_min[i],
            weatherCode: res.daily.weather_code[i],
          })),
        })),
      );
  }
}