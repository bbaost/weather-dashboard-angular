import { TestBed } from '@angular/core/testing';
import { Forecast } from '../../core/weather.models';
import { ForecastView } from './forecast-view';

const forecast: Forecast = {
  current: { temperature: 18, weatherCode: 0, windSpeed: 10 },
  daily: [
    { date: '2026-11-13', tempMax: 20, tempMin: 10, weatherCode: 3 },
    { date: '2026-11-14', tempMax: 22, tempMin: 12, weatherCode: 61 },
  ],
};

describe('ForecastView', () => {
  async function render(unit: 'C' | 'F'): Promise<HTMLElement> {
    await TestBed.configureTestingModule({ imports: [ForecastView] }).compileComponents();
    const fixture = TestBed.createComponent(ForecastView);
    fixture.componentRef.setInput('forecast', forecast);
    fixture.componentRef.setInput('unit', unit);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('shows the current temperature and one card per day', async () => {
    const el = await render('C');
    expect(el.querySelector('.temp')?.textContent).toContain('18°C');
    expect(el.querySelectorAll('.days li').length).toBe(2);
  });

  it('converts temperatures to Fahrenheit', async () => {
    const el = await render('F');
    expect(el.querySelector('.temp')?.textContent).toContain('64°F');
  });
});