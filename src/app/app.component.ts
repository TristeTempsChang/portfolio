import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { project } from '../models/project.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AnimateOnScrollDirective } from './animate-on-scroll.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ReactiveFormsModule, AnimateOnScrollDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  projectList!: project[]
  contactForm!: FormGroup;

  constructor(private formBuilder: FormBuilder){
    this.contactForm = this.formBuilder.group({
      mail: new FormControl('', {validators: [Validators.required]}),
      name: new FormControl('', {validators: [Validators.required]}),
      subject: new FormControl('', {validators: [Validators.required]}),
      message: new FormControl('', {validators: [Validators.required]})
    });
  }


  ngOnInit(): void {
    this.consoleText(['Web Dev', 'Full-Stack Dev', 'Geek'], 'text');
    this.projectList = [
      {
        "name": "GPEI",
        "image": "../assets/gpei.png",
        "language": [
          {language: 'Angular'},
          {language: 'Firebase'}
        ],
        "text": "GPEI is my very first web site/application project, which I completed in 2022, during my BTS exams. The site was intended for my mother's parents' association, and had the specificity of being able to manage the site with an administration section respecting CRUD principles.",
        "siteLink": "https://gpei-mennecy.fr",
        "gitLink": "https://github.com/TristeTempsChang/GPEI",
        "github": true
      },
      {
        "name": "A Goose Brand",
        "image": "../assets/goose.png",
        "language": [
          {language: "HTML"},
          {language: "TailwindCSS"},
          {language: "Javascript"}
        ],
        "text": "A Goose Brand is a showcase website created as part of a school project called the MyDigitalSchool English Game. This one presents a board game created by my working group. The site also presents addons implemented online that are compatible with the board game.",
        "siteLink": "https://agoosebrand.netlify.app/",
        "gitLink": "https://github.com/TristeTempsChang/A-Goose-Brand",
        "github": true
      },
      {
        "name": "La Virée Terroir",
        "image": "../assets/terroir.png",
        "language": [
          {language: "Angular"},
          {language: "MySQL"},
          {language: "TailwindCSS"},
          {language: "NestJS"},
          {language: "Docker"}
        ],
        "text": "La Virée Terroir is a project I created as part of my test for my Bachelor's degree. The site is also an application that puts local producers in touch with potential tourist customers, so that they can discover the specialties of the region they wish to visit.",
        "siteLink": "",
        "gitLink": "https://gitlab.com/tristan.tran2111/lavireeterroir-front",
        "github": false
      }
    ]
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

  onSubmit(){

  }
}
