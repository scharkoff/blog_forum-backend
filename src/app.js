import cors from 'cors';
import { getConnection } from './configs/config.js';

export class App {
    constructor(express) {
        this._express = express;
        this._app = express();

        this._app.use(express.json());
        this._app.use(cors());
        getConnection();
    }

    listen(port) {
        if (!Number.isInteger(port)) {
            throw new TypeError('Port must be number');
        }

        this._app.listen(process.env.PORT || port, (err) => {
            if (err) {
                return console.log(err);
            }

            console.log('Server started');
        });
    }

    useRoutes(routes) {
        if (!Array.isArray(routes)) {
            throw new TypeError('Routes must be array');
        }

        routes.forEach((route) => {
            this._app.use(route);
        });
    }
}
