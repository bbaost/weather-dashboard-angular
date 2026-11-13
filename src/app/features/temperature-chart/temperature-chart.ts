import { Component, computed, input } from '@angular/core';
import { DailyForecast } from '../../core/weather.models';
import { Unit, convertTemp } from '../../core/temperature';

const WIDTH = 360;
const HEIGHT = 190;
const PAD_X = 28;
const PAD_TOP = 28;
const PAD_BOTTOM = 48; // reserved for the min labels and the dates

@Component({
  selector: 'app-temperature-chart',
  templateUrl: './temperature-chart.html',
  styleUrl: './temperature-chart.scss',
})
export class TemperatureChart {
  daily = input.required<DailyForecast[]>();
  unit = input.required<Unit>();

  readonly width = WIDTH;
  readonly height = HEIGHT;

  model = computed(() => {
    const days = this.daily();
    if (!days.length) return null;

    const unit = this.unit();
    const max = days.map((d) => convertTemp(d.tempMax, unit));
    const min = days.map((d) => convertTemp(d.tempMin, unit));
    const all = [...max, ...min];
    const lo = Math.min(...all);
    const span = Math.max(...all) - lo || 1;
    const plotHeight = HEIGHT - PAD_TOP - PAD_BOTTOM;

    const x = (i: number) => PAD_X + (i * (WIDTH - 2 * PAD_X)) / Math.max(days.length - 1, 1);
    const y = (v: number) => PAD_TOP + plotHeight - ((v - lo) / span) * plotHeight;

    return {
      maxLine: max.map((v, i) => `${x(i)},${y(v)}`).join(' '),
      minLine: min.map((v, i) => `${x(i)},${y(v)}`).join(' '),
      points: days.map((d, i) => ({
        x: x(i),
        yMax: y(max[i]),
        yMin: y(min[i]),
        max: max[i],
        min: min[i],
        label: new Date(`${d.date}T12:00:00`).toLocaleDateString('en-GB', {
          weekday: 'short',
          day: 'numeric',
        }),
      })),
    };
  });
}