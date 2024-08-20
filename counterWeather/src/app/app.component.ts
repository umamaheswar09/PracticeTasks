import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LeftpanelComponent } from './leftpanel/leftpanel.component';
import { RightpanelComponent } from './rightpanel/rightpanel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule, LeftpanelComponent,RightpanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'counterWeather';

  selectedWeatherData: any;

  onCitySelected(weatherData: any) {
    this.selectedWeatherData = weatherData;
  }
}
