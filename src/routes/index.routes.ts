import userRouter from "./user.routes";
import eventRouter from "./event.routes";
import docRouter from "./doc.routes";

const basePath = "/api/v1";

export default (app: { use: (arg0: string, arg1: any) => void; }) => {
    app.use(`${basePath}/users`, userRouter);
    app.use(`${basePath}/events`, eventRouter);
    app.use(`${basePath}/docs`, docRouter);
};