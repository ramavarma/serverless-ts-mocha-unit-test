import { expect } from "chai";
import { User } from "./user";
import { UserService } from './user-service';


let userService: UserService;
describe('User Service Tests', () => {
    
    beforeEach(() => {
        userService = new UserService();
    });
    describe('Read All Users', () => {
        it('Should return an array of length greater than one', async () => {
            const users: Array<User> = await userService.read({}, 'user');
            expect(users.length).to.be.greaterThan(0);
        });
    });
});