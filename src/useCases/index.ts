import { WillyrexGifsUseCase } from './WillyrexGifsUseCase';
import { GifRepository } from '../repository/GifRepository';

const gifRepo = new GifRepository();
const willyrexGifsUseCase = new WillyrexGifsUseCase(gifRepo);

export { willyrexGifsUseCase };
