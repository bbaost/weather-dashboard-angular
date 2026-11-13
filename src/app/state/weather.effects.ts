import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { WeatherService } from '../core/weather.service';
import { WeatherActions } from './weather.actions';
import { FAVORITES_KEY, weatherFeature } from './weather.reducer';

export const loadForecast$ = createEffect(
  (actions$ = inject(Actions), weather = inject(WeatherService)) =>
    actions$.pipe(
      ofType(WeatherActions.citySelected),
      switchMap(({ city }) =>
        weather.getForecast(city.latitude, city.longitude).pipe(
          map((forecast) => WeatherActions.forecastLoaded({ forecast })),
          catchError(() =>
            of(WeatherActions.forecastFailed({ error: 'Could not load the forecast. Try again.' })),
          ),
        ),
      ),
    ),
  { functional: true },
);

export const persistFavorites$ = createEffect(
  (actions$ = inject(Actions), store = inject(Store)) =>
    actions$.pipe(
      ofType(WeatherActions.favoriteToggled),
      withLatestFrom(store.select(weatherFeature.selectFavorites)),
      tap(([, favorites]) => {
        try {
          localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
        } catch {
          // storage unavailable: favorites just won't persist
        }
      }),
    ),
  { functional: true, dispatch: false },
);