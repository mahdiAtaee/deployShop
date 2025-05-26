import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as fileUpload from "express-fileupload";
import { Application, static as static_root } from "express";
import { join } from "path";

export default function boot(app: Application) {
  app.use(cors(
    {
      origin:true,
      credentials:true
    }
  ));
  app.use(bodyParser.json());
  app.use(fileUpload());
  app.use('/contents', static_root(join(__dirname, '../public/contents')));
}
