import { WillyrexGifsUseCase } from './WillyrexGifsUseCase';
import { Vegetta777GifsUseCase } from './Vegetta777GifsUseCase';
import { GifRepository } from '../repository/GifRepository';

const gifRepo = new GifRepository();
const willyrexGifsUseCase = new WillyrexGifsUseCase(gifRepo);
const vegetta777GifsUseCase = new Vegetta777GifsUseCase(gifRepo);

export { willyrexGifsUseCase, vegetta777GifsUseCase };
