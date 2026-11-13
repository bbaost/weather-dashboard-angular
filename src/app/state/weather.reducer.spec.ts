import { City } from '../core/weather.models';
import { WeatherActions } from './weather.action';
import { initialState, weatherFeature } from './weather.reducer';

const toulouse: City = {
  id: 1,
  name: 'Toulouse',
  country: 'France',
  latitude: 43.6,
  longitude: 1.44,
};
const base = { ...initialState, favorites: [] };
const { reducer } = weatherFeature;

describe('weather reducer', () => {
  it('starts loading when a city is selected', () => {
    const state = reducer(base, WeatherActions.citySelected({ city: toulouse }));
    expect(state.city).toEqual(toulouse);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('stores the error and stops loading on failure', () => {
    const loading = { ...base, loading: true };
    const state = reducer(loading, WeatherActions.forecastFailed({ error: 'boom' }));
    expect(state.loading).toBe(false);
    expect(state.error).toBe('boom');
  });

  it('adds then removes a favorite', () => {
    const added = reducer(base, WeatherActions.favoriteToggled({ city: toulouse }));
    expect(added.favorites).toEqual([toulouse]);
    const removed = reducer(added, WeatherActions.favoriteToggled({ city: toulouse }));
    expect(removed.favorites).toEqual([]);
  });

  it('toggles the unit', () => {
    expect(reducer(base, WeatherActions.unitToggled()).unit).toBe('F');
  });
});