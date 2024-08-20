import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rightpanel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rightpanel.component.html',
  styleUrl: './rightpanel.component.scss'
})
export class RightpanelComponent {
  @Input() weatherData: any;

  getForecastDays(): string[] {
    if (!this.weatherData) return [];
    const days = [];
    for (let i = 0; i < 5; i++) {
      days.push(new Date(this.weatherData.forecast[i].date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' }));
    }
    return days;
  }
}
