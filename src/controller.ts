import { APIGatewayEvent, APIGatewayProxyHandler, Callback } from "aws-lambda";
import { Context } from "vm";
import { GreetingLocalizerService } from "./greeting-localizer-service";
import { User } from "./user";



const service: GreetingLocalizerService = new GreetingLocalizerService();

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


export const addUser: APIGatewayProxyHandler = (req: APIGatewayEvent, context: Context, cb: Callback) => {
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
        response.statusCode = 200;
        response.body = JSON.stringify({
            message: JSON.stringify(user),
        });

    }
    console.log(response.statusCode)
    cb(null, response);
}





