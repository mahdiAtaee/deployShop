import { config } from "dotenv";
config();
import "./infrastructure/connection/mongoose";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { create as UserFactory } from "./src/Factories/Mongo/UserFactory";
import { create as CategoryFactory } from "./src/Factories/Mongo/CategoryFactory";
import { create as ProductFactory } from "./src/Factories/Mongo/ProductFactory";
import { create as OrderFactory } from "./src/Factories/Mongo/OrderFactory";
import { create as ProductOfferFactory } from "./src/Factories/Mongo/ProductOfferFactory";
import { create as ShipmentFactory } from "./src/Factories/Mongo/ShipmentFactory";
import { create as SettingFactory } from "./src/Factories/Mongo/SettingFactory";
import { create as CommentFactory } from "./src/Factories/Mongo/CommentFactory"
import { create as PaymentFactory } from './src/Factories/Mongo/PaymentFactory'

yargs(hideBin(process.argv))
  .command(
    "factory [model]",
    "Run model factory",
    (yargs) => {
      return yargs.positional("model", {
        describe: "model to bind on",
      });
    },
    (argv) => {
      if (argv.model) {
        console.log(`create model ${argv.model} ${argv.count}`);
        switch (argv.model) {
          case "user":
            UserFactory(argv.count as unknown as number)
              .then((data) => {
                console.log("create users successfully");
                process.exit();
              })
              .catch((error) => console.log(error.message));
            break;
          case "category":
            CategoryFactory(argv.count as unknown as number)
              .then((data) => {
                console.log("create categories successfully");
                process.exit();
              })
              .catch((error) => console.log(error.message));
            break;
          case "product":
            ProductFactory(argv.count as unknown as number)
              .then((data) => {
                console.log("create product successfully");
                process.exit();
              })
              .catch((error) => console.log(error.message));
            break;
          case "order":
            OrderFactory(argv.count as unknown as number)
              .then((data) => {
                console.log("create orders successfully");
                process.exit();
              })
              .catch((error) => console.log(error.message));
            break;
          case "productOffer":
            console.log(argv)
            ProductOfferFactory(argv.count as unknown as number)
              .then((data) => {
                console.log("create productOffer successfully");
                process.exit();
              })
              .catch((error) => console.log(error.message));
            break;
          case "shipment":
            console.log(argv)
            ShipmentFactory(argv.count as unknown as number)
              .then((data) => {
                console.log("create shipment successfully");
                process.exit();
              })
              .catch((error) => console.log(error.message));
            break;
          case "setting":
            console.log(argv)
            SettingFactory(argv.count as unknown as number)
              .then((data) => {
                console.log("create settings successfully");
                process.exit();
              })
              .catch((error) => console.log(error.message));
            break;
          case "comment":
            CommentFactory(argv.count as unknown as number)
              .then((data) => {
                console.log("create comments successfully");
                process.exit();
              })
              .catch((error) => console.log(error.message));
            break
          case "payment":
            PaymentFactory(argv.count as unknown as number)
              .then((data) => {
                console.log("create payments successfully");
                process.exit();
              })
              .catch((error) => console.log(error.message));
            break
          default:
            break;
        }
      }
    }
  )
  .option("count", {
    alias: "-c",
    type: "number",
    description: "count of records must be created",
  })
  .parse();
