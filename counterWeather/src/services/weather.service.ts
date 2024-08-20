import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = 'd4594364698122bfd1c4b3eb5f2ff19f';
  private baseUrl = 'https://api.openweathermap.org/data/2.5/';

  constructor(private http: HttpClient) {}

  getWeatherData(cityName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}weather?q=${cityName}&appid=${this.apiKey}&units=metric`).pipe(
      map((response:any) => {
        return {
          cityName: response['name'],
          temp: response['main']['temp'],
          description: response['weather'][0]['description'],
          icon: `https://openweathermap.org/img/wn/${response['weather'][0]['icon']}.png`,
          wind: response['wind']['speed'],
          pressure: response['main']['pressure']
        };
      })
    );
  }

  getWeatherForecast(cityName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}forecast?q=${cityName}&appid=${this.apiKey}&units=metric`).pipe(
      map((response:any) => {
        return response['list'].map((forecast:any) => ({
          temp: forecast['main']['temp'],
          description: forecast['weather'][0]['description'],
          icon: `https://openweathermap.org/img/wn/${forecast['weather'][0]['icon']}.png`,
          date: forecast['dt_txt']
        }));
      })
    );
  }
}
