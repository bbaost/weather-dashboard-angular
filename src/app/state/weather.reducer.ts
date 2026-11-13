import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { City, Forecast } from '../core/weather.models';
import { WeatherActions } from './weather.actions';

export const FAVORITES_KEY = 'weather.favorites';

export interface WeatherState {
  city: City | null;
  forecast: Forecast | null;
  loading: boolean;
  error: string | null;
  favorites: City[];
  unit: 'C' | 'F';
}

function loadFavorites(): City[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? (JSON.parse(raw) as City[]) : [];
  } catch {
    return [];
  }
}

export const initialState: WeatherState = {
  city: null,
  forecast: null,
  loading: false,
  error: null,
  favorites: loadFavorites(),
  unit: 'C',
};

export const weatherFeature = createFeature({
  name: 'weather',
  reducer: createReducer(
    initialState,
    on(WeatherActions.citySelected, (state, { city }) => ({
      ...state,
      city,
      forecast: null,
      loading: true,
      error: null,
    })),
    on(WeatherActions.forecastLoaded, (state, { forecast }) => ({
      ...state,
      forecast,
      loading: false,
    })),
    on(WeatherActions.forecastFailed, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
    on(WeatherActions.favoriteToggled, (state, { city }) => ({
      ...state,
      favorites: state.favorites.some((f) => f.id === city.id)
        ? state.favorites.filter((f) => f.id !== city.id)
        : [...state.favorites, city],
    })),
    on(WeatherActions.unitToggled, (state) => ({
      ...state,
      unit: state.unit === 'C' ? ('F' as const) : ('C' as const),
    })),
  ),
  extraSelectors: ({ selectFavorites, selectCity }) => ({
    selectIsFavorite: createSelector(
      selectFavorites,
      selectCity,
      (favorites, city) => !!city && favorites.some((f) => f.id === city.id),
    ),
  }),
});