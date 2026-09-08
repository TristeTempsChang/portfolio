import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { project } from '../models/project.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AnimateOnScrollDirective } from './animate-on-scroll.directive';
import { CommonModule } from '@angular/common';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ReactiveFormsModule, AnimateOnScrollDirective, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  projectList!: project[]
  contactForm!: FormGroup;
  isRequiredEmail: boolean = false;
  isRequiredName: boolean = false;
  isRequiredSubject: boolean = false;
  isRequiredMessage: boolean = false;
  isEmailValid: boolean = false
  loading: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      mail: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z\\s]+$')
      ]),
      subject: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9\\s]+$')
      ]),
      message: new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ])
    });
  }


  ngOnInit(): void {
    this.consoleText(['Dev web', 'Dev Full-Stack', 'Passionné'], 'text');
    this.projectList = [
      {
        "name": "GPEI",
        "image": "../assets/gpei.png",
        "language": [
          {language: 'Angular'},
          {language: 'PHP'}
        ],
        "text": "GPEI est mon tout premier projet de site web/application, que j'ai mené à bien en 2022, pendant mes examens du BTS. Ce site était destiné à une association de parents d'élèves et avait pour particularité de permettre la gestion du site via un espace d'administration respectant les principes CRUD. Le site a subi une refonte graphique en 2026",
        "siteLink": "https://gpei-mennecy.fr",
        "gitLink": null,
        "github": true
      },
      {
        "name": "La Brick Rouge",
        "image": "../assets/brickrouge.png",
        "language": [
          {language: "VueJS"},
          {language: "SCSS"},
          {language: ".NET"}
        ],
        "text": "La brick rouge est un projet constitué d'un site vitrine et d'un back-office que j'ai rejoint en cours de route. Ce projet avait été réalisé par un ami dans le cadre de l'activité de restaurateur de ses parents",
        "siteLink": "https://labrickrouge.fr/",
        "gitLink": null,
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
        "text": "La Virée Terroir est un projet que j'ai créé dans le cadre de mon mémoire de licence. Ce site est également une application qui met en relation les producteurs locaux avec des touristes potentiels, afin que ces derniers puissent découvrir les spécialités de la région qu'ils souhaitent visiter.",
        "siteLink": "https://lavireeterroir.fr",
        "gitLink": "null",
        "github": false
      }
    ]
  }

  consoleText(words: string[], id: string) {
    if (typeof document !== 'undefined') {
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

  onSubmit() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;

      // Paramètres pour EmailJS
      const templateParams = {
        from_name: formData.name,
        from_mail: formData.mail,
        subject: formData.subject,
        message: formData.message
      };

      // Envoi du formulaire avec EmailJS
      emailjs.send('service_gmjc1r8', 'template_26vkgw9', templateParams, 'NlyDEg8D_5vWuJ4bf')
        .then(() => {
          alert('Message envoyé avec succès !');
          this.loading = false
          this.contactForm.reset();
        }, () => {
          this.loading = false
          alert('Échec de l\'envoi du message.');
        });

      this.loading = true;
    } else {
      this.validateForm();
    }
  }

  // Validation du formulaire et affichage des erreurs
  validateForm() {
    this.isRequiredEmail = this.contactForm.get('mail')?.errors?.['required'] || false;
    this.isEmailValid = this.contactForm.get('mail')?.errors?.['email'] || false;
    this.isRequiredName = this.contactForm.get('name')?.errors?.['required'] || false;
    this.isRequiredSubject = this.contactForm.get('subject')?.errors?.['required'] || false;
    this.isRequiredMessage = this.contactForm.get('message')?.errors?.['required'] || false;
  }
}
