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
import { Component, inject } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { CitySearch } from './features/city-search/city-search';
import { City } from './core/weather.models';
import { Store } from '@ngrx/store';
import { weatherFeature } from './state/weather.reducer';
import { WeatherActions } from './state/weather.actions';

@Component({
  selector: 'app-root',
  imports: [CitySearch, JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private store = inject(Store);

  city = this.store.selectSignal(weatherFeature.selectCity);
  forecast = this.store.selectSignal(weatherFeature.selectForecast);
  loading = this.store.selectSignal(weatherFeature.selectLoading);
  error = this.store.selectSignal(weatherFeature.selectError);
  favorites = this.store.selectSignal(weatherFeature.selectFavorites);
  isFavorite = this.store.selectSignal(weatherFeature.selectIsFavorite);

  onCitySelected(city: City): void {
    this.store.dispatch(WeatherActions.citySelected({ city }));
  }

  toggleFavorite(city: City): void {
    this.store.dispatch(WeatherActions.favoriteToggled({ city }));
  }
}