import { Component, inject, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, map, of, switchMap } from 'rxjs';
import { WeatherService } from '../../core/weather.service';
import { City } from '../../core/weather.models';

@Component({
  selector: 'app-city-search',
  imports: [ReactiveFormsModule],
  templateUrl: './city-search.html',
  styleUrl: './city-search.scss',
})
export class CitySearch {
  private weather = inject(WeatherService);

  citySelected = output<City>();
  query = new FormControl('', { nonNullable: true });

  results = toSignal(
    this.query.valueChanges.pipe(
      debounceTime(300),
      map((value) => value.trim()),
      distinctUntilChanged(),
      switchMap((q) =>
        q.length < 2 ? of([]) : this.weather.searchCities(q).pipe(catchError(() => of([]))),
      ),
    ),
    { initialValue: [] as City[] },
  );

  select(city: City): void {
    this.citySelected.emit(city);
    this.query.setValue('');
  }
}