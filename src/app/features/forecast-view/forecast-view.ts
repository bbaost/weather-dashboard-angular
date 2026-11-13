import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Forecast } from '../../core/weather.models';
import { Unit, convertTemp } from '../../core/temperature';
import { describeWeather } from '../../core/weather-codes';

@Component({
  selector: 'app-forecast-view',
  imports: [DatePipe],
  templateUrl: './forecast-view.html',
  styleUrl: './forecast-view.scss',
})
export class ForecastView {
  forecast = input.required<Forecast>();
  unit = input.required<Unit>();

  temp(celsius: number): number {
    return convertTemp(celsius, this.unit());
  }

  describe = describeWeather;
}