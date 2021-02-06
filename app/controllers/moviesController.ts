import axios from "axios";
import { Request, Response } from "express";
import {
  failureResponse,
  mongoError,
  successResponse,
} from "../models/common/service";
import { IMovies } from "../models/movies/model";
import MoviesService from "../models/movies/service";

export class MoviesController {
  private moviesService: MoviesService = new MoviesService();

  /**
   * get the movies using the omdb api key, check if that movie exist in the bd, if doesn't exist, then it is saved in the mongodb.
   * @param req
   * @param res
   */
  public async getMovies(req: Request, res: Response) {
    let result: any[] = await axios
      .get(
        `http://www.omdbapi.com/?apikey=${process.env.OMDBKEY}&s=Love&y=2020&type=movie`
      )
      .then(async (movies) => movies.data["Search"])
      .catch((error) => failureResponse(error, null, res));

    const promises = result.map(async (movie) => {
      if (!(await this.moviesService.findMovieByName(movie.Title))) {
        let movieObject: IMovies = {
          name: movie.Title,
          year: movie.Year,
          type: movie.Type,
          image: movie.Poster,
        };
        await this.moviesService.createMovies(movieObject);
      }
    });

    await Promise.all(promises);

    this.moviesService.getMovies((err: any, data: IMovies) => {
      if (err) {
        mongoError(err, res);
      } else {
        successResponse("get movies successfull", data, res);
      }
    });
  }
}
