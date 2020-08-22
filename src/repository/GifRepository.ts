import axios, { AxiosResponse } from 'axios';

import ConfigSchema from '../configuration/EnvSchema';
import { ResponseGif } from '../domain/ResponseGifData';

interface IGifRepository {
  findWillyrexGifs(): Promise<ResponseGif>;
}

export class GifRepository implements IGifRepository {
  private BASE_URL = 'https://api.tenor.com/v1';

  private async makeGifRequest(
    q: string,
    pos = 0
  ): Promise<AxiosResponse<ResponseGif>> {
    return axios.get<ResponseGif>(
      `${this.BASE_URL}/search?q=${q}&media_filter=minimal&limit=50&pos=${pos}&key=${ConfigSchema.TENOR_KEY}`
    );
  }

  async findWillyrexGifs(pos = 0): Promise<ResponseGif> {
    const { data } = await this.makeGifRequest('willyrex', pos);

    return data;
  }

  async findVegetta777Gifs(pos = 0): Promise<ResponseGif> {
    const { data } = await this.makeGifRequest('vegetta777', pos);

    return data;
  }
}
