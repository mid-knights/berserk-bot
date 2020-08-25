import { WillyrexGifsUseCase } from './getWillyrexGifs/WillyrexGifsUseCase';
import { Vegetta777GifsUseCase } from './getVegetta777Gifs/Vegetta777GifsUseCase';
import { InstagramUseCase } from './getInstagramImage/InstagramUseCase';

import { GifRepository } from '../repository/GifRepository';
import { InstagramRepository } from '../repository/InstagramRepository';

const gifRepo = new GifRepository();
const instaRepo = new InstagramRepository();

const willyrexGifsUseCase = new WillyrexGifsUseCase(gifRepo);
const vegetta777GifsUseCase = new Vegetta777GifsUseCase(gifRepo);
const instagramUseCase = new InstagramUseCase(instaRepo);

export { willyrexGifsUseCase, vegetta777GifsUseCase, instagramUseCase };
