import { InstagramRepository } from '../../repository/InstagramRepository';
import { Result, Either, left, right } from '../../core/logic/Result';
import { getRandomIntInclusive } from '../../utils';
import { UseCase } from '../../core/domain/UseCase';
import { GenericAppError } from '../../core/logic/AppError';
import { InstagramDTO } from './InstagramDTO';

export interface InstagramUser {
  imageUrl: string;
  avatarUrl: string;
}

type Response = Either<Result<any>, Result<InstagramUser>>;

export class InstagramUseCase implements UseCase<InstagramDTO, Response> {
  constructor(private instaRepo: InstagramRepository) {}

  async execute(request: InstagramDTO): Promise<Response> {
    const { username } = request;

    try {
      const response = await this.instaRepo.getUrlImages(username);

      return right(
        Result.ok<InstagramUser>({
          imageUrl:
            response.imagesUrl[
              getRandomIntInclusive(0, response.imagesUrl.length)
            ],
          avatarUrl: response.avatarUrl,
        })
      ) as Response;
    } catch (err) {
      return left(new GenericAppError.UnexpectedError(err)) as Response;
    }
  }
}
