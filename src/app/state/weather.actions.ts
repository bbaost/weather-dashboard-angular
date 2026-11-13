import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { City, Forecast } from '../core/weather.models';

export const WeatherActions = createActionGroup({
  source: 'Weather',
  events: {
    'City Selected': props<{ city: City }>(),
    'Forecast Loaded': props<{ forecast: Forecast }>(),
    'Forecast Failed': props<{ error: string }>(),
    'Favorite Toggled': props<{ city: City }>(),
    'Unit Toggled': emptyProps(),
  },
});