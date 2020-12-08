
import * as express from "express";
import * as _ from "lodash";
import { App } from "src/app";

export class StockController {
    public path = "/stocks";
    public router = express.Router();
    private _app: App;

    constructor(app:App) {
        this._app = app;
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(this.path, this.getStock);
    }

    public getStock = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        response.json(this._app.stocks.ToReturn());
    }
}