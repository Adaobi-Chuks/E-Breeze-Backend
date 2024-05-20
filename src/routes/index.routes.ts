import userRouter from "./user.routes";
import authRouter from "./auth.routes";
import eventRouter from "./event.routes";
import docRouter from "./doc.routes";

const basePath = "/api/v1";

export default (app: { use: (arg0: string, arg1: any) => void; }) => {
    app.use(`${basePath}/auth`, authRouter);
    app.use(`${basePath}/user`, userRouter);
    app.use(`${basePath}/event`, eventRouter);
    app.use(`${basePath}/docs`, docRouter);
};