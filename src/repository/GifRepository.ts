import axios from 'axios';
import ConfigSchema from './../config/ConfigSchema';

interface IGifRepository {
  findWillyrexGifs(): Promise<any>;
}

export interface ResponseGifData {
  url: string;
}

export interface ResponseGif {
  weburl: string;
  next: number;
  results: ResponseGifData[];
}

export class GifRepository implements IGifRepository {
  private BASE_URL = 'https://api.tenor.com/v1';

  async findWillyrexGifs(pos = 0): Promise<ResponseGif> {
    const response = await axios.get<ResponseGif>(
      `${this.BASE_URL}/search?q=willyrex&media_filter=minimal&limit=50&pos=${pos}&key=${ConfigSchema.TENOR_KEY}`
    );

    return response.data;
  }
}
