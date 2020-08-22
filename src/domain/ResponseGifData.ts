interface MediaGifData {
  url: string;
}

interface ResponseGifMedia {
  gif: MediaGifData;
  mp4: MediaGifData;
  tinygif: MediaGifData;
}

interface ResponseGifData {
  url: string;
  media: ResponseGifMedia[];
}

export interface ResponseGif {
  weburl: string;
  next: number;
  results: ResponseGifData[];
}
