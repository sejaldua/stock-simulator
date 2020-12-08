import * as bodyParser from "body-parser";
import * as session from "express-session";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as http from "http";
import * as cors from "cors";
import * as helmet from "helmet";
import * as fs from "fs";
import * as compression from "compression";
import * as  SimplexNoise from "simplex-noise";
import { Stocks, Stock } from "./model/Stocks";
import * as socketIo from "socket.io";

export class App {
    public app: express.Application;
    public server: http.Server;
    public port: number;
    public stocks: Stocks = new Stocks();
    private _io: SocketIO.Server;

    public async setup(controllers, port): Promise<void> {
        this.app = express();
        this.server = http.createServer(this.app);
        this.port = port;

        this._io = socketIo(this.server, {
            transports: ["websocket", "polling"]
        });
        this._io.on("connect", (socket: socketIo.Socket) => {
            console.log("client connected")
        });

        setInterval(() => {
            this.stocks.UpdateAllStocks();
            this._io.emit("stocks", this.stocks.ToReturn());
            console.log("send updates")
        }, 3000);

        // enable cors
        this.app.use(cors({
            origin: (origin, callback) => {
                return callback(null, true);
            },
            optionsSuccessStatus: 200,
            credentials: true
        }));

        this.initializeMiddlewares();
        this.initializeControllers(controllers);

        this.initializeErrorHandler();
    }

    public listen() {
        this.server.listen(this.port, () => {
            console.log(`listening on port ${this.port} for http`);
        });
    }

    private async initializeMiddlewares() {
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.text());

        this.app.use(helmet());
        this.app.use(compression());
    }

    private initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use("/", controller.router);
        });
    }

    private initializeErrorHandler() {
        this.app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(400).json({ status: "error", message: err.message });
        });
    }
}
