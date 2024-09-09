interface Language {
    language: string;
  }

export class project {
    name: string;
    image: string;
    language: Language[];
    text: string;
    siteLink: string;
    gitLink: string;
    github: boolean;



    constructor(name: string, image: string, language: Language[], text: string, siteLink: string, gitLink: string, github: boolean) {
        this.name = name;
        this.image = image;
        this.language = language;
        this.text = text
        this.siteLink = siteLink;
        this.gitLink = gitLink;
        this.github = github;
    }
} 