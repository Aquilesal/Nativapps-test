import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import { MoviesRoutes } from "./routes/moviesRoutes";

class App {
  public app: express.Application;
  public mongoUrl: string;

  private moviesRoutes: MoviesRoutes = new MoviesRoutes();

  constructor() {
    dotenv.config();
    this.app = express();
    this.config();
    this.mongoSetup();
    this.moviesRoutes.route(this.app);
    const swaggerDocument = require("../swagger.json");

    this.app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
  }

  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());
    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private mongoSetup(): void {
    this.mongoUrl = process.env.URL!;
    mongoose.connect(this.mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  }
}
export default new App().app;
