import { IMovies } from "./model";
import movies from "./schema";

export default class MoviesService {
  public createMovies(movie: IMovies) {
    const _session = new movies(movie);
    return _session.save();
  }

  public getMovies(callback: any) {
    return movies.find(callback);
  }

  public findMovieByName(name: String) {
    return movies.findOne({ name: name }).exec();
  }
}
