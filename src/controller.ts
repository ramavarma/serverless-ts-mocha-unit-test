import { APIGatewayEvent, APIGatewayProxyHandler, Callback } from "aws-lambda";
import { Context } from "vm";
import { GreetingLocalizerService } from "./greeting-localizer-service";



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
        const locale: string = req.body;
        response.statusCode = 202;
        response.body = JSON.stringify({
            message: `service.getLocalGreeting(${locale})`,
        })

    }
    console.log(response.statusCode)
    cb(null, response);
}


