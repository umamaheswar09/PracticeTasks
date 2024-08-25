import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {

  userMessage = '';
  messages: any[] = [];

  BOT_MSGS = [
    "Hi, how are you?",
    "Ohh... I can't understand what you are trying to say. Sorry!",
    "I like to play games... But I don't know how to play!",
    "Sorry if my answers are not relevant. :))",
    "I feel sleepy! :(",
  ];

  BOT_IMG = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Logo_wikibot.svg/400px-Logo_wikibot.svg.png";
  PERSON_IMG = "https://www.svgrepo.com/show/192244/man-user.svg";
  BOT_NAME = "BOT";
  PERSON_NAME = "User";

  onSubmit(event: Event) {
    event.preventDefault();
    const msgText = this.userMessage;
    if (!msgText) return;

    this.appendMessage(this.PERSON_NAME, this.PERSON_IMG, "right", msgText);
    this.userMessage = "";

    this.botResponse();
  }

  appendMessage(name: string, img: string, side: string, text: string) {
    const msg = {
      name,
      img,
      side,
      text,
      time: this.formatDate(new Date())
    };

    this.messages.push(msg);
    setTimeout(() => {
      const chatContainer = document.querySelector('.msger-chat') as HTMLElement;
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 0);
  }

  botResponse() {
    const r = this.random(0, this.BOT_MSGS.length - 1);
    const msgText = this.BOT_MSGS[r];
    const delay = msgText.split(" ").length * 100;

    setTimeout(() => {
      this.appendMessage(this.BOT_NAME, this.BOT_IMG, "left", msgText);
    }, delay);
  }

  formatDate(date: Date) {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();

    return `${h.slice(-2)}:${m.slice(-2)}`;
  }

  random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
