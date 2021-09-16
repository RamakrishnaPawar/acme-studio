import "reflect-metadata";
import express, {Application, NextFunction, Request, Response} from 'express';
import {json} from 'body-parser';
import {ContainerBuilder} from "./dependency-injection/ContainerBuilder";
import {InversifyExpressServer} from "inversify-express-utils";

(async () => {
    // TODO: move port to config file
    const port = 4000;
    const app = express();
    const container = await ContainerBuilder.build();
    new
    InversifyExpressServer(container, null, null, app)
        .setConfig((app: Application) => {
            return app.use(json())
                .use((err: Error, req: Request, res: Response, next: NextFunction) => {
                    res.status(500).json({message: err.message});
                });
        }).build()
        .listen(port, () => console.log(`Server listening at port ${port}`))
})();
