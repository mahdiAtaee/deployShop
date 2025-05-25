import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as fileUpload from "express-fileupload";
import { Application, static as static_root } from "express";

export default function boot(app: Application) {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(fileUpload());
  app.use(static_root("public"));
}
