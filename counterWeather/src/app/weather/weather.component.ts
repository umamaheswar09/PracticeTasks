import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { WeatherService } from '../../services/weather.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, FormsModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent {
  cityName = '';
  locations: any[] = [];
  city!: string;
  forecast: any;
  showClearBtn = false;

  constructor(private weatherService: WeatherService, private router: Router) { }

  addCity() {
    if (this.cityName.trim()) {
      this.weatherService.getCurrentWeather(this.cityName).subscribe(
        (data: any) => {
          const location = {
            name: data.name,
            temp: data.main.temp,
            status: data.weather[0].main
          };
          this.showClearBtn = true
          this.locations.unshift(location);
          if (this.locations.length > 8) {
            this.locations.pop()
          };
          this.cityName = '';
        },
        () => {
          alert('City not found');
        }
      );
    }
    this.onClickCity(this.cityName.trim())
  }

  refreshLocation(location: any, event: any) {
    event.stopPropagation();
    this.weatherService.getCurrentWeather(location.name).subscribe((data) => {
      location.temp = data.main.temp;
      location.status = data.weather[0].main;
    });
  }

  removeLocation(location: any, event: any) {
    event.stopPropagation();
    this.locations = this.locations.filter(loc => loc !== location);
    if (this.forecast && this.forecast.city.name === location.name) {
      this.forecast = null;
    }
    console.log("Removed location:", location.name);
    console.log("Remaining locations:", this.locations);
  }
  
  clearLocations() {
    this.locations = [];
    this.forecast = null;
  }

  viewDetails(location: any) {
    this.router.navigate(['/weather', location.name]);
  }

  onClickCity(city: string) {
    if (city) {
      this.weatherService.getWeatherForecast(city).subscribe(
        (data: any) => {
          this.city = city
          this.forecast = data;
          console.log(this.forecast)
        },
        (error: any) => {
          console.error('Error fetching weather forecast:', error);
        }
      );
    } else {
      console.error('No city provided in route.');
    }
  }

  refreshForecast() {
    if (this.city) {
      this.weatherService.getWeatherForecast(this.city).subscribe(
        (data: any) => {
          this.forecast = data;
          console.log(this.forecast)
        },
        (error: any) => {
          console.error('Error refreshing weather forecast:', error);
        }
      );
    } else {
      console.error('Cannot refresh forecast: No city provided.');
    }
  }

  getWeatherIcon(iconCode: string): string {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }

  getDailyForecasts(list: any[]): any[] {
    const dailyForecasts: any[] = [];
    const processedDays: Set<string> = new Set();
    const today = new Date().toISOString().split('T')[0];
    list.forEach(item => {
      const date = item.dt_txt.split(' ')[0];
      if (date !== today && !processedDays.has(date)) {
        dailyForecasts.push(item);
        processedDays.add(date);
      }
    });

    return dailyForecasts;
  }

}
