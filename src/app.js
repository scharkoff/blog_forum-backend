import cors from 'cors';
import getConnection from 'configs/config.js';
import cookieParser from 'cookie-parser';
import routes from 'routes/index.js';
import typeDefs from 'graphql/schema.js';
import resolvers from 'graphql/resolvers.js';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

export default class App {
    _routes = [];

    constructor(express) {
        this._express = express;
        this._app = express();

        this._app.use(express.json());
        this._app.use(
            cors({
                origin: process.env.ORIGIN,
                credentials: true,
            }),
        );
        this._app.use(cookieParser());
        this._app.set('trust proxy', 1);

        this._routes = routes;
        this._routes.forEach((route) => {
            this._app.use(route);
        });

        getConnection();
    }

    async listen(port) {
        if (!Number.isInteger(port)) {
            throw new TypeError('Port must be a number');
        }

        const server = new ApolloServer({
            typeDefs,
            resolvers,
            introspection: true,
        });
        const { url } = await startStandaloneServer(server, {
            listen: { port: 4000 },
        });

        console.log(`🚀  Graphql server ready at: ${url}`);

        this._app.listen(process.env.PORT || port, (err) => {
            if (err) {
                return console.log(err);
            }

            console.log(`Server started on port ${port}`);
        });
    }
}
