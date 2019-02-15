import { controller, httpGet } from 'inversify-express-utils';
import { Request, Response } from 'express';

@controller('/')
export default class IndexController {

    @httpGet('/')
    public get(
        request: Request,
        response: Response): void {
        response.render('index');
    }
}
