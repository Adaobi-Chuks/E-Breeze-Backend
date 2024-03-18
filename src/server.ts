import  "express-async-errors";
import app from "./app";
import { logger } from "./middlewares/errors.middlewares";
import connectToMongo from "./configs/database.configs";

const port = process.env.PORT || 9871;

(async () => {
  logger.info(`Attempting to run server on port ${port}`);
  connectToMongo();
  app.listen(port, () => {
    logger.info(`Listening on port ${port}`);
  });
})();