import { Component, computed, input } from '@angular/core';
import { DailyForecast } from '../../core/weather.models';
import { Unit, convertTemp } from '../../core/temperature';

const WIDTH = 320;
const HEIGHT = 140;
const PAD = 24;

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

    const x = (i: number) => PAD + (i * (WIDTH - 2 * PAD)) / Math.max(days.length - 1, 1);
    const y = (v: number) => HEIGHT - PAD - ((v - lo) / span) * (HEIGHT - 2 * PAD);

    return {
      maxLine: max.map((v, i) => `${x(i)},${y(v)}`).join(' '),
      minLine: min.map((v, i) => `${x(i)},${y(v)}`).join(' '),
      points: days.map((d, i) => ({
        x: x(i),
        yMax: y(max[i]),
        yMin: y(min[i]),
        max: max[i],
        min: min[i],
        label: d.date.slice(5),
      })),
    };
  });
}