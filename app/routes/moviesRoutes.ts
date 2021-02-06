import { Application, Request, Response } from "express";
import { MoviesController } from "../controllers/moviesController";

export class MoviesRoutes {
  private moviesController: MoviesController = new MoviesController();

  public route(app: Application) {
    app.get("/api/movies", (req: Request, res: Response) => {
      this.moviesController.getMovies(req, res);
    });
  }
}
