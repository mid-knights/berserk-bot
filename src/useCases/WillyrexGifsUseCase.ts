import { GifRepository } from '../repository/GifRepository';
import { getRandomIntInclusive } from '../utils';

export class WillyrexGifsUseCase {
  constructor(private gifRepo: GifRepository) {}

  async execute(): Promise<string> {
    try {
      const response = await this.gifRepo.findWillyrexGifs();
      let gifLinks = response.results.map((opt) => opt.url);

      let pos = response.next;

      while (pos > 0) {
        const { next, results } = await this.gifRepo.findWillyrexGifs(pos);
        gifLinks = gifLinks.concat(results.map((opt) => opt.url));
        pos = next;
      }

      return gifLinks[getRandomIntInclusive(0, gifLinks.length)];
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}
