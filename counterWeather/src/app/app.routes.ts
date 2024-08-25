import { Routes } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { ChatComponent } from './chat/chat.component';
import { WeatherComponent } from './weather/weather.component';

export const routes: Routes = [
  { path: '', redirectTo: '/counter', pathMatch: 'full' },
  { path: 'counter', component: CounterComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'weather', component: WeatherComponent },
];
