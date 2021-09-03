import { APIGatewayEvent, APIGatewayProxyHandler, Callback } from "aws-lambda";
import { ObjectId } from "bson";
import { Context } from "vm";
import { GreetingLocalizerService } from "./greeting-localizer-service";
import { User } from "./user";
import { UserService } from "./user-service";



const service: GreetingLocalizerService = new GreetingLocalizerService();
const userService: UserService = new UserService();

export const hello: APIGatewayProxyHandler = (req: APIGatewayEvent, context: Context, cb: Callback) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: service.getLocalGreeting(service.pickLocale()),
        }),
      };
    
      cb(null, response);
}


export const localizedHello: APIGatewayProxyHandler = (req: APIGatewayEvent, context: Context, cb: Callback) => {
 
    const response = {
        statusCode: 504,
        body: JSON.stringify({
            message: ``,
        }),
    };

    if(!req.body) {
        const error: Error = {
            name: "400",
            message: "BAD REQUEST"
        }
        response.statusCode = 400;
        response.body = JSON.stringify(error);
    } else {
        const locale: string = JSON.parse(req.body);
        response.statusCode = 200;
        console.log(req.body)
        response.body = JSON.stringify({
            message: `service.getLocalGreeting(${locale})`,
        })


    }
    console.log(response.statusCode)
    cb(null, response);
}


export const addUser = async (req: APIGatewayEvent, context: Context, cb: Callback) => {
    // console.log(req.body);
    const response = {
        statusCode: 504,
        body: JSON.stringify({
            message: ``,
        }),
    };

    if(!req.body) {
        const error: Error = {
            name: "400",
            message: "BAD REQUEST"
        }
        response.statusCode = 400;
        response.body = JSON.stringify(error);
    } else {
        const user: User = JSON.parse(JSON.stringify(req.body)) ;
        await userService.write(user).then((value: ObjectId) => {
            console.log(`Success`);
            response.statusCode = 200;
            response.body = JSON.stringify({
                message: JSON.stringify(value),
            });
        }).catch(error => {
            console.error(`Failed insertion`);
            response.statusCode = 500;
            response.body = JSON.stringify({
                message: JSON.stringify(error),
            });
        });
    }
    console.log(response.statusCode)
    cb(null, response);
}


export const getUser = async (req: APIGatewayEvent, context: Context, cb: Callback) => {
    // console.log(req.body);
    const response = {
        statusCode: 504,
        body: JSON.stringify({
            message: ``,
        }),
    };
    await userService.read({}, 'user').then((values: Array<User>) => {
        console.log(`Success`);
        response.statusCode = 200;
        response.body = JSON.stringify({
            message: JSON.stringify(values),
        });
    }).catch(error => {
        console.error(`Failed insertion`);
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: JSON.stringify(error),
        });
    });
    console.log(response.statusCode)
    cb(null, response);
}





