import { convertTemp } from './temperature';
import { describeWeather } from './weather-codes';

describe('convertTemp', () => {
  it('keeps Celsius, rounded', () => {
    expect(convertTemp(18.4, 'C')).toBe(18);
  });

  it('converts to Fahrenheit', () => {
    expect(convertTemp(0, 'F')).toBe(32);
    expect(convertTemp(100, 'F')).toBe(212);
  });
});

describe('describeWeather', () => {
  it('maps a known code', () => {
    expect(describeWeather(0).label).toBe('Clear sky');
  });

  it('falls back for an unknown code', () => {
    expect(describeWeather(12345).label).toBe('Unknown');
  });
});