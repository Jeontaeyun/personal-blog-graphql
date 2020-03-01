export interface IContext {
    req: Express.Request;
    user: (req: Express.Request & { user: any }) => any;
}
