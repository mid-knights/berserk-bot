import { InstagramRepository } from '../../repository/InstagramRepository';
import { Result, Either, left, right } from '../../core/logic/Result';
import { getRandomIntInclusive } from '../../utils';
import { UseCase } from '../../core/domain/UseCase';
import { GenericAppError } from '../../core/logic/AppError';
import { InstagramDTO } from './InstagramDTO';
import { InstagramUserUsername } from '../../domain/InstagramUserUsername';
import { InstagramUserLink } from '../../domain/InstagramUserLink';
import { InstagramUser } from '../../domain/InstagramUser';

type Response = Either<Result<any>, Result<InstagramUser>>;

export class InstagramUseCase implements UseCase<InstagramDTO, Response> {
  constructor(private instaRepo: InstagramRepository) {}

  async execute(request: InstagramDTO): Promise<Response> {
    const { username } = request;
    try {

      const usernameOrError = InstagramUserUsername.create({
        value: username,
      });

      if (usernameOrError.isFailure) {
        return left(Result.fail<void>(usernameOrError.error)) as Response;
      }

      const instagramUser = await this.instaRepo.getUser(username);

      if (instagramUser) {
        const totalLinks = await this.instaRepo.getTotalLinksByUser(
          instagramUser.id
        );

        const firstId = await this.instaRepo.getFirstUserLinkId(instagramUser.id);
        const randomId = getRandomIntInclusive(firstId, firstId + totalLinks);

        const instagramLink = await this.instaRepo.getLinksById(
          instagramUser.id,
          randomId
        );

        const linkOrError = InstagramUserLink.create({
          value: instagramLink.link,
        });

        if (linkOrError.isFailure) {
          return left(Result.fail<void>(linkOrError.error)) as Response;
        }

        const instaUserOrError = InstagramUser.create({
          avatarURL: instagramUser.avatarUrl,
          link: linkOrError.getValue(),
          username: usernameOrError.getValue(),
        });

        if (instaUserOrError.isFailure) {
          return left(Result.fail<void>(instaUserOrError.error)) as Response;
        }

        return right(
          Result.ok<InstagramUser>(instaUserOrError.getValue())
        ) as Response;
      } else {
        const response = await this.instaRepo.getUrlImages(username);

        const urlLinks = response.imagesUrl;
        const avatarURL = response.avatarUrl;

        const link = urlLinks[getRandomIntInclusive(0, urlLinks.length)];

        const linkOrError = InstagramUserLink.create({
          value: link,
        });

        if (linkOrError.isFailure) {
          return left(Result.fail<void>(linkOrError.error)) as Response;
        }

        const instaUserOrError = InstagramUser.create({
          avatarURL,
          link: linkOrError.getValue(),
          username: usernameOrError.getValue(),
        });

        if (instaUserOrError.isFailure) {
          return left(Result.fail<void>(instaUserOrError.error)) as Response;
        }

        await this.instaRepo.storeUserInstagram(username, avatarURL, urlLinks);

        return right(
          Result.ok<InstagramUser>(instaUserOrError.getValue())
        ) as Response;
      }
    } catch (err) {
      return left(new GenericAppError.UnexpectedError(err)) as Response;
    }
  }
}
