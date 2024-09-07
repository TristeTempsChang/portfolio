import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layout/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  assetsUrl = "../assets/info.png"

  ngOnInit(): void {
    this.consoleText(['Web Developer', 'Full-Stack Developer', 'Geek'], 'text');
  }

  consoleText(words: string[], id: string) {
    let visible = true;
    const con = document.getElementById('console');
    let letterCount = 1;
    let x = 1;
    let waiting = false;
    const target = document.getElementById(id);

    setInterval(() => {
      if (letterCount === 0 && waiting === false) {
        waiting = true;
        target!.innerHTML = words[0].substring(0, letterCount);
        setTimeout(() => {
          const usedWord = words.shift();
          words.push(usedWord!);
          x = 1;
          letterCount += x;
          waiting = false;
        }, 1000);
      } else if (letterCount === words[0].length + 1 && waiting === false) {
        waiting = true;
        setTimeout(() => {
          x = -1;
          letterCount += x;
          waiting = false;
        }, 1000);
      } else if (waiting === false) {
        target!.innerHTML = words[0].substring(0, letterCount);
        letterCount += x;
      }
    }, 120);

    setInterval(() => {
      if (visible === true) {
        con!.classList.add('hidden');
        visible = false;
      } else {
        con!.classList.remove('hidden');
        visible = true;
      }
    }, 400);
  }
}
