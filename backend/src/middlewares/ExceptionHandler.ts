import { Application, NextFunction, Request, Response } from "express";
import Exception from "../components/exceptions/Exception";

export default function ExceptionHandler(app: Application) {
  app.use((error: Exception, req: Request, res: Response, next: NextFunction) => {
    console.log(error);

    res.status(error.status).send({
      statusCode: error.status,
      error: true,
      message: error.message,
    });
  });
}
