// import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   imports: [RouterOutlet],
//   selector: 'app-root',
//   styleUrl: './app.scss',
//   templateUrl: './app.html',
// })
// export class App {
//   protected readonly title = signal('dashboard-weather');
// }
import { Component, inject, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { CitySearch } from './features/city-search/city-search';
import { WeatherService } from './core/weather.service';
import { City, Forecast } from './core/weather.models';

@Component({
  selector: 'app-root',
  imports: [CitySearch, JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private weather = inject(WeatherService);

  city = signal<City | null>(null);
  forecast = signal<Forecast | null>(null);

  onCitySelected(city: City): void {
    this.city.set(city);
    this.weather
      .getForecast(city.latitude, city.longitude)
      .subscribe((forecast) => this.forecast.set(forecast));
  }
}