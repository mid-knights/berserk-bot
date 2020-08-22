import { GifRepository } from '../repository/GifRepository';
import { Result, Either, left, right } from '../core/logic/Result';
import { getRandomIntInclusive } from '../utils';
import { UseCase } from '../core/domain/UseCase';
import { GenericAppError } from '../core/logic/AppError';

type Response = Either<Result<any>, Result<string>>;

export class Vegetta777GifsUseCase implements UseCase<void, Response> {
  constructor(private gifRepo: GifRepository) {}

  async execute(): Promise<Response> {
    try {
      const response = await this.gifRepo.findVegetta777Gifs();
      let gifLinks = response.results.map(
        (opt) => opt.media.map((m) => m.gif.url)[0]
      );

      let pos = response.next;

      while (pos > 0) {
        const { next, results } = await this.gifRepo.findVegetta777Gifs(pos);
        gifLinks = gifLinks.concat(
          results.map((opt) => opt.media.map((m) => m.gif.url)[0])
        );
        pos = next;
      }

      return right(
        Result.ok<string>(gifLinks[getRandomIntInclusive(0, gifLinks.length)])
      ) as Response;
    } catch (err) {
      return left(new GenericAppError.UnexpectedError(err)) as Response;
    }
  }
}
