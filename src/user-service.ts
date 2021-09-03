import { InsertOneResult, MongoClient, ObjectId } from "mongodb";
import { User } from "./user";


export class UserService {
    

    private DB_URL: string = process.env.MONGO_DB_URL || 'mongodb://localhost';
    private DB_NAME: string = process.env.MONGO_DB_DB_NAME || 'mock-demo';

    constructor() {
        console.log(`URL: ${this.DB_URL}`);
        console.log(`DB Name: ${this.DB_NAME}`);
    }

    public write(record: User): Promise<ObjectId> {
        return new Promise<ObjectId>((resolve, reject) => {
            MongoClient.connect(this.DB_URL).then((client: MongoClient) => {
                client.db(this.DB_NAME).collection('user').insertOne(record).then((value: InsertOneResult) => {
                    if (value) {
                        console.log(JSON.stringify(value));
                        resolve(value.insertedId);
                    } else {
                        console.error(`Undefined Result`);
                        reject(`Undefined Result`);
                    }
                }).catch(error => {
                    console.error(error);
                    reject(error);
                }).finally(() => {
                    client.close();
                });
                
            }).catch(error => {
                console.error(error);
                reject(error);
            });
        });
    }

    public read(query: any, collection: string): Promise<Array<User>> {
        return new Promise<Array<User>>((resolve, reject) => {
            MongoClient.connect(this.DB_URL).then((client: MongoClient) => {
                client.db(this.DB_NAME).collection(collection).find(query).toArray().then((values: Array<User>) => {
                    if (values) {
                        console.log(JSON.stringify(values));
                        resolve(values);
                    } else {
                        console.error(`Undefined Result`);
                        reject(`Undefined Result`);
                    }
                }).catch(error => {
                    console.error(error);
                    reject(error);
                }).finally(() => {
                    client.close();
                });
                
            }).catch(error => {
                console.error(error);
                reject(error);
            });
        });
    }

}