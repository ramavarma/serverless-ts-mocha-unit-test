import { expect } from "chai";
import { GreetingLocalizerService } from "./greeting-localizer-service";

let service: GreetingLocalizerService;

describe('Hello Function', () => {
    beforeEach(() => {
        service = new GreetingLocalizerService();
        // console.log(`Before each called`);
    });
    
    it(`Correct greeting is generated for English`, () => {
        expect(service.getLocalGreeting("en")).to.equal("Hello!");
    });

    it(`Correct greeting is generated for Russian`, () => {
        expect(service.getLocalGreeting("ru")).to.equal("Привет!");
    });

    it(`Correct greeting is generated for Spanish`, () => {
        expect(service.getLocalGreeting("es")).to.equal("¡Hola!");
    });

    it(`Correct greeting is generated for French`, () => {
        expect(service.getLocalGreeting("fr")).to.equal("🌊");
    });

    it(`Correct greeting is generated for Chineese`, () => {
        expect(service.getLocalGreeting("cn")).to.equal("👋");
    });
});


describe('Hello Function', () => {
    beforeEach(() => {
        service = new GreetingLocalizerService();
    });

    it(`Checking if language is English`, () => {
        expect(service.isEnglish("en")).to.be.true;
    });

    it(`Checking if Non english language returns false`, () => {
        expect(service.isEnglish("fr")).to.be.false;
    });

});
