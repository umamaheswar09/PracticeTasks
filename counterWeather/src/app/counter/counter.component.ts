import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent {
  counters: { value: number }[] = [];

  addCounter() {
    this.counters.push({ value: 0 });
  }

  incrementCounter(index: number) {
    this.counters[index].value++;
  }

  decrementCounter(index: number) {
    this.counters[index].value--;
  }

  deleteCounter(index: number) {
    this.counters.splice(index, 1);
  }

  resetCounters() {
    this.counters = [];
  }
}
