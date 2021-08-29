export class GreetingLocalizerService {
    constructor() {
        console.log(`Hello world`);
    }

    
    public getLocalGreeting(language: string): string {
        switch(language) {
            case "en":
                return "Hello!";
            case "es":
                return "¡Hola!";
            case "ru":
                return "Привет!";
            // case "fr":
            //     return "🌊";
            default:
                return "👋";
        }
    }

    public isEnglish(locale: string): boolean {
        if (locale === `en`) {
            return true;
        } else {
            return false;
        }
    }

    public pickLocale(): string {
        const languages = ["en", "es", "cn", "fr", "ru"];
        return languages [Math.floor(Math.random() * languages.length)];
    }
}