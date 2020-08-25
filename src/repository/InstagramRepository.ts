import puppeteer from 'puppeteer';
import { InstagramResponse } from '../domain/InstagramResponse';

export class InstagramRepository {
  async getUrlImages(username: string): Promise<InstagramResponse> {
    const URL_ENDPOINTS = `https://www.instagram.com/${username}`;

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--window-size=1920,920'],
      defaultViewport: null,
    });

    const page = await browser.newPage();
    await page.goto(URL_ENDPOINTS);

    const data: InstagramResponse = await page.evaluate(() => {
      const urlImages: string[] = [];

      const headerContainer = document.querySelector('header > .XjzKX > div');
      const avatarUrl: string =
        headerContainer?.querySelector('img')?.src || '';

      const containerImagesSelector = document.querySelector(
        '.ySN3v > div > div'
      )?.children;

      if (!containerImagesSelector || containerImagesSelector.length === 0) {
        const response: InstagramResponse = {
          avatarUrl,
          imagesUrl: [],
        };

        return response;
      }

      const containerImages = Array.from(
        document.querySelector('.ySN3v > div > div')?.children || []
      );

      for (const row of containerImages) {
        const rowImages = Array.from(row.children);

        for (const imageContainer of rowImages) {
          const url = imageContainer.querySelector('img')?.src || null;

          if (url) {
            urlImages.push(url);
          }
        }
      }

      const response: InstagramResponse = {
        imagesUrl: urlImages,
        avatarUrl,
      };

      return response;
    });

    await page.close();
    await browser.close();

    return data;
  }
}

(async () => {
  const insta = new InstagramRepository();

  await insta.getUrlImages('fegalvao_');
})();
