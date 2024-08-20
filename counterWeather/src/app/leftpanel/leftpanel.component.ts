import { Component, EventEmitter, Output } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leftpanel',
  standalone: true,
  imports: [FormsModule, CommonModule ],
  templateUrl: './leftpanel.component.html',
  styleUrl: './leftpanel.component.scss'
})
export class LeftpanelComponent {
  cityName: string = '';
  recentLocations: any[] = [];
  @Output() citySelected = new EventEmitter<any>();

  constructor(private weatherService: WeatherService) {}

  addCity() {
    if (this.cityName.trim()) {
      this.weatherService.getWeatherData(this.cityName).subscribe(
        data => {
          if (this.recentLocations.length >= 8) {
            this.recentLocations.pop();
          }
          this.recentLocations.unshift(data);
          this.cityName = '';
        },
        error => {
          alert('City not found!');
        }
      );
    }
  }

  refreshCity(location: any) {
    this.weatherService.getWeatherData(location.cityName).subscribe(
      data => {
        const index = this.recentLocations.findIndex(loc => loc.cityName === location.cityName);
        if (index !== -1) {
          this.recentLocations[index] = data;
        }
      }
    );
  }

  removeCity(location: any) {
    this.recentLocations = this.recentLocations.filter(loc => loc.cityName !== location.cityName);
  }

  clearLocations() {
    this.recentLocations = [];
  }

// src/app/left-panel/left-panel.component.ts (add to selectCity method)
selectCity(location: any) {
  this.weatherService.getWeatherForecast(location.cityName).subscribe(forecast => {
    const weatherWithForecast = { ...location, forecast };
    this.citySelected.emit(weatherWithForecast);
  });
}

}
