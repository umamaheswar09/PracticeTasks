import { Routes } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { ChatComponent } from './chat/chat.component';
import { WeatherComponent } from './weather/weather.component';

export const routes: Routes = [
    { path: 'chat', component: ChatComponent },
  { path: 'counter', component: CounterComponent },
  { path: 'weather', component: WeatherComponent },
  { path: '', redirectTo: '/chat', pathMatch: 'full' } // Default route
];
